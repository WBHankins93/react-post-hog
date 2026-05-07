import { FormEvent, KeyboardEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchResult, searchWorkspace } from '../features/search/searchApi';

const modules = [
  {
    title: 'Notes / docs',
    description: 'Write the canonical story once, then make it easy to rediscover.',
    route: '/docs',
    badge: 'docs.mdx',
    outcome: 'Shared context',
  },
  {
    title: 'Tasks / launches',
    description: 'Plan tiny launches with the same discipline as product releases.',
    route: '/workspace',
    badge: 'launch.plan',
    outcome: 'Next actions',
  },
  {
    title: 'Decisions',
    description: 'Keep lightweight ADRs close to the workbench context that created them.',
    route: '/docs',
    badge: 'adr.log',
    outcome: 'Tradeoffs',
  },
  {
    title: 'Research',
    description: 'Collect inputs, questions, and references before they become strategy.',
    route: '/workspace',
    badge: 'research.db',
    outcome: 'Signals',
  },
  {
    title: 'Changelog',
    description: 'Expose launch notes and release rhythm as part of the public product surface.',
    route: '/docs',
    badge: 'changelog.md',
    outcome: 'Release story',
  },
  {
    title: 'Handbook',
    description: 'Turn process docs into a readable operating manual for how the HQ is built.',
    route: '/docs',
    badge: 'handbook.mdx',
    outcome: 'Operating rules',
  },
];

const launchNotes = [
  'Design polish now focuses on decision clarity instead of decorative chrome.',
  'Search should graduate from content lookup to command discovery.',
  'MVP2 should prove the workspace can guide a launch from context to confidence.',
];

const mvp2Tracks = [
  {
    title: 'Guided workspace',
    description: 'Replace static previews with artifacts, recents, and next-action prompts.',
    status: 'MVP2.1',
    evidence: 'Users can resume the last launch context without rereading the docs.',
  },
  {
    title: 'Search as command layer',
    description: 'Blend docs, files, and route actions into one keyboard-first discovery surface.',
    status: 'MVP2.2',
    evidence: 'A query can open context, execute navigation, or explain why nothing matched.',
  },
  {
    title: 'Launch readiness',
    description: 'Expose checklist health, release notes, and runbook confidence before deploys.',
    status: 'MVP2.3',
    evidence: 'Reviewers can see what is ready, blocked, and intentionally deferred.',
  },
];

const readinessStats = [
  { label: 'Core surfaces', value: '3/3', detail: 'Home, workspace, docs' },
  { label: 'Next MVP2 proof', value: 'Guidance', detail: 'Prompts and confidence states' },
  { label: 'Risk to resolve', value: 'Search', detail: 'Move beyond static results' },
];

const actionQueue = [
  'Add artifact summaries to the workspace viewer.',
  'Promote command actions inside search results.',
  'Expose launch checklist status in the shell chrome.',
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
      setErrorMessage('Search is unavailable. Verify backend is running on port 8000.');
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
            A calmer MVP shell for a marketing site, docs surface, and OS-like app — now tuned
            toward MVP2 workflows: guided context, richer search, and launch readiness.
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

        <aside className="readinessCard" aria-label="MVP2 readiness summary">
          <div className="readinessCard__header">
            <p className="eyebrow">MVP2 snapshot</p>
            <strong>Ready to shape</strong>
          </div>
          <div className="readinessCard__stats">
            {readinessStats.map((stat) => (
              <div className="readinessStat" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <p>{stat.detail}</p>
              </div>
            ))}
          </div>
          <div className="readinessCard__queue">
            <p className="readinessCard__label">Next build queue</p>
            <ol>
              {actionQueue.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

      <section className="moduleGrid" aria-labelledby="module-grid-title">
        <div>
          <p className="eyebrow">Product OS modules</p>
          <h2 id="module-grid-title">A tidier workbench rhythm for the MVP2 runway.</h2>
        </div>
        <div className="moduleGrid__cards">
          {modules.map((module) => (
            <Link key={module.title} to={module.route} className="moduleCard">
              <span className="moduleCard__badge">{module.badge}</span>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <span className="moduleCard__outcome">{module.outcome}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mvpPanel" aria-labelledby="mvp2-title">
        <div className="mvpPanel__intro">
          <p className="eyebrow">MVP2 runway</p>
          <h2 id="mvp2-title">What MVP2 looks like from here.</h2>
          <p>
            MVP2 should feel less like a static demo and more like a small operating room: every
            surface explains the current context, the next useful action, and the confidence level
            for shipping.
          </p>
        </div>
        <div className="mvpPanel__tracks">
          {mvp2Tracks.map((track) => (
            <article className="mvpTrack" key={track.title}>
              <span>{track.status}</span>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <small>{track.evidence}</small>
            </article>
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
