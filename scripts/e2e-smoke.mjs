import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const appUrl = 'http://127.0.0.1:4175';
const debugPort = 9335;

const browserCandidates = [
  process.env.E2E_BROWSER,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].filter(Boolean);

function findBrowser() {
  return browserCandidates.find((candidate) => existsSync(candidate));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHttp(url, label) {
  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
    } catch {
      await wait(250);
    }
  }

  throw new Error(`${label} did not become available at ${url}`);
}

function startProcess(command, args, label) {
  const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '';

  child.stdout.on('data', (chunk) => {
    output += chunk.toString();
  });

  child.stderr.on('data', (chunk) => {
    output += chunk.toString();
  });

  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`${label} exited with code ${code}\n${output}`);
    }
  });

  return child;
}

async function stopProcess(child) {
  if (!child || child.exitCode !== null) {
    return;
  }

  child.kill();
  await new Promise((resolve) => child.once('exit', resolve));
}

async function removeTempDir(directory) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      rmSync(directory, { recursive: true, force: true });
      return;
    } catch (error) {
      if (attempt === 4) {
        throw error;
      }

      await wait(250);
    }
  }
}

async function connectToPage(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) {
      return;
    }

    const callbacks = pending.get(message.id);
    if (!callbacks) {
      return;
    }

    pending.delete(message.id);
    if (message.error) {
      callbacks.reject(new Error(message.error.message));
      return;
    }

    callbacks.resolve(message.result);
  });

  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  function send(method, params = {}) {
    id += 1;
    socket.send(JSON.stringify({ id, method, params }));

    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
    });
  }

  return { send, close: () => socket.close() };
}

async function evaluate(page, expression) {
  const result = await page.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? 'Browser evaluation failed');
  }

  return result.result.value;
}

async function waitFor(page, expression, label) {
  const deadline = Date.now() + 8_000;

  while (Date.now() < deadline) {
    if (await evaluate(page, expression)) {
      return;
    }

    await wait(150);
  }

  throw new Error(`Timed out waiting for ${label}`);
}

function js(value) {
  return JSON.stringify(value);
}

async function clickText(page, text) {
  await evaluate(
    page,
    `(() => {
      const target = [...document.querySelectorAll('a, button')]
        .find((element) => element.textContent.includes(${js(text)}));
      if (!target) return false;
      target.click();
      return true;
    })()`,
  );
}

async function setInputValue(page, selector, value) {
  await evaluate(
    page,
    `(() => {
      const input = document.querySelector(${js(selector)});
      if (!input) return false;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(input, ${js(value)});
      input.dispatchEvent(new Event('input', { bubbles: true }));
      return true;
    })()`,
  );
}

async function runBrowserFlow(page) {
  await page.send('Page.enable');
  await page.send('Runtime.enable');
  await page.send('Page.navigate', { url: appUrl });

  await waitFor(page, `document.body.textContent.includes('Personal HQ')`, 'home page');
  await clickText(page, 'Open projects.app');
  await waitFor(page, `location.pathname === '/projects'`, 'projects route');
  await waitFor(page, `document.body.textContent.includes('Sprooutflow')`, 'projects content');
  await clickText(page, 'Open workspace.app');
  await waitFor(page, `location.pathname === '/workspace'`, 'workspace route');
  await clickText(page, 'research.db');
  await waitFor(page, `document.body.textContent.includes('Collect questions')`, 'file preview');

  await evaluate(
    page,
    `window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }))`,
  );
  await waitFor(page, `document.body.textContent.includes('Search commands')`, 'command palette');
  await clickText(page, 'Open tools.app');
  await waitFor(page, `location.pathname === '/tools'`, 'tools route from command palette');

  await page.send('Page.navigate', { url: appUrl });
  await waitFor(page, `location.pathname === '/tools'`, 'restored tools route');
  await clickText(page, 'home.mdx');
  await waitFor(page, `location.pathname === '/'`, 'home route');
  await setInputValue(page, '#workspace-search', 'workspace');
  await evaluate(page, `document.querySelector('.searchPanel').requestSubmit()`);
  await waitFor(
    page,
    `document.body.textContent.includes('Search service is unreachable')`,
    'search fallback',
  );
}

async function main() {
  const browserPath = findBrowser();
  if (!browserPath) {
    throw new Error('No local Chrome/Chromium browser found. Set E2E_BROWSER to run e2e smoke tests.');
  }

  const vite = startProcess('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4175'], 'Vite');
  const userDataDir = mkdtempSync(path.join(tmpdir(), 'personal-hq-e2e-'));
  let browser;
  let page;

  try {
    await waitForHttp(appUrl, 'Vite');

    browser = startProcess(
      browserPath,
      [
        `--remote-debugging-port=${debugPort}`,
        `--user-data-dir=${userDataDir}`,
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        appUrl,
      ],
      'Browser',
    );

    await waitForHttp(`http://127.0.0.1:${debugPort}/json/version`, 'Browser debugger');
    const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
    const target = targets.find((item) => item.type === 'page');
    if (!target?.webSocketDebuggerUrl) {
      throw new Error('Browser launched, but no debuggable page was found.');
    }

    page = await connectToPage(target.webSocketDebuggerUrl);
    await runBrowserFlow(page);
    console.log('E2E smoke test passed');
  } finally {
    page?.close();
    await stopProcess(browser);
    await stopProcess(vite);
    await removeTempDir(userDataDir);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
