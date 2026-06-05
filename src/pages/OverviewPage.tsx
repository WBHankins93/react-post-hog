import { FormEvent, KeyboardEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchApiError, SearchResult, searchWorkspace } from '../features/search/searchApi';

const modules = [
  {
    title: 'Notes / docs',
    description: 'Write the canonical story once, then make it easy to rediscover.',
    route: '/docs',
    badge: 'docs.mdx',
  },
  {
    title: 'Tasks / launches',
    description: 'Plan tiny launches with the same discipline as product releases.',
    route: '/workspace',
    badge: 'launch.plan',
  },
  {
    title: 'Decisions',
    description: 'Keep lightweight ADRs close to the workbench context that created them.',
    route: '/docs',
    badge: 'adr.log',
  },
  {
    title: 'Research',
    description: 'Collect inputs, questions, and references before they become strategy.',
    route: '/workspace',
    badge: 'research.db',
  },
  {
    title: 'Changelog',
    description: 'Expose launch notes and release rhythm as part of the public product surface.',
    route: '/docs',
    badge: 'changelog.md',
  },
  {
    title: 'Handbook',
    description: 'Turn process docs into a readable operating manual for how the HQ is built.',
    route: '/docs',
    badge: 'handbook.mdx',
  },
];

const launchNotes = [
  'PR-011: visual system polish is the next build checkpoint.',
  'PR-012: search gets richer cards, keyboard movement, and clearer states.',
  'Mascot and illustration exploration stays paused for maintainer review.',
];

export function OverviewPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();

    setHasSearched(Boolean(trimmedQuery));
    setIsLoading(Boolean(trimmedQuery));
    setErrorMessage(null);
    setActiveResultIndex(0);

    try {
      const response = await searchWorkspace(trimmedQuery);
      setResults(response.results);
    } catch (error) {
      setErrorMessage(
        error instanceof SearchApiError
          ? error.message
          : 'Search is unavailable. Verify backend is running on port 8000.',
      );
      setResults([]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleResultKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (results.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveResultIndex((previous) => (previous + 1) % results.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveResultIndex((previous) => (previous - 1 + results.length) % results.length);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      navigate(results[activeResultIndex].route);
    }
  }

  const hasResults = results.length > 0;
  const showNoMatches = hasSearched && !isLoading && !errorMessage && !hasResults;
  const showInitialState = !hasSearched && !isLoading && !errorMessage && !hasResults;

  return (
    <section className="homePage">
      <div className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Personal HQ / product-os.local</p>
          <h2>Build your tiny company operating system from one playful workbench.</h2>
          <p className="hero__lede">
            A PostHog-inspired skeleton for a marketing site, docs surface, and OS-like app shell —
            with original content, original visuals, and keyboard-first workflows.
          </p>
          <div className="hero__actions">
            <Link to="/workspace" className="buttonLink buttonLink--primary">
              Open workspace.app
            </Link>
            <Link to="/docs" className="buttonLink">
              Read docs.mdx
            </Link>
          </div>
        </div>

        <div className="terminalCard" aria-label="Install command preview">
          <div className="terminalCard__bar">
            <span />
            <span />
            <span />
          </div>
          <p className="terminalCard__label">Install the idea</p>
          <code>npx personal-hq@latest init --mode=playful</code>
          <p>
            No copied mascot yet. Just the bones: homepage, file chrome, command deck, docs, and
            search.
          </p>
        </div>
      </div>

      <section className="moduleGrid" aria-labelledby="module-grid-title">
        <div>
          <p className="eyebrow">Product OS modules</p>
          <h2 id="module-grid-title">Original modules, familiar workbench rhythm.</h2>
        </div>
        <div className="moduleGrid__cards">
          {modules.map((module) => (
            <Link key={module.title} to={module.route} className="moduleCard">
              <span className="moduleCard__badge">{module.badge}</span>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="launchNotes" aria-labelledby="launch-notes-title">
        <p className="eyebrow">Changelog-ish</p>
        <h2 id="launch-notes-title">What the next review should look at.</h2>
        <ul>
          {launchNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <form className="searchPanel" onSubmit={handleSearch}>
        <div className="searchPanel__header">
          <div>
            <p className="eyebrow">PR-012 preview</p>
            <h2>Search the workbench</h2>
          </div>
          <p>Use arrows to move through results, then Enter to open the active result.</p>
        </div>
        <label className="searchPanel__label" htmlFor="workspace-search">
          Search project content
        </label>
        <div className="searchPanel__controls">
          <input
            id="workspace-search"
            className="searchPanel__input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try: workspace, architecture, command, module"
          />
          <button type="submit" className="searchPanel__button" disabled={isLoading}>
            {isLoading ? 'Searching…' : 'Search'}
          </button>
        </div>

        {errorMessage ? <p className="searchPanel__error">{errorMessage}</p> : null}

        <ul className="searchPanel__results" onKeyDown={handleResultKeyDown} tabIndex={0}>
          {showInitialState ? (
            <li className="searchPanel__empty">Search is ready. Try a module, command, or docs query.</li>
          ) : null}
          {isLoading ? <li className="searchPanel__empty">Looking through the workbench…</li> : null}
          {showNoMatches ? <li className="searchPanel__empty">No matches yet. Try “workspace” or “docs”.</li> : null}
          {hasResults
            ? results.map((result, index) => (
                <li
                  key={result.id}
                  className={`searchPanel__result${index === activeResultIndex ? ' searchPanel__result--active' : ''}`}
                  aria-current={index === activeResultIndex ? 'true' : undefined}
                >
                  <div className="searchPanel__meta">
                    <span>{result.type}</span>
                    <span>{result.category}</span>
                  </div>
                  <p className="searchPanel__title">{result.title}</p>
                  <p>{result.snippet}</p>
                  <Link to={result.route} className="searchPanel__link">
                    Open {result.route}
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </form>
    </section>
  );
}
