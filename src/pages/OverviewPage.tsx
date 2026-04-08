import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchResult, searchWorkspace } from '../features/search/searchApi';

export function OverviewPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await searchWorkspace(query);
      setResults(response.results);
    } catch (error) {
      setErrorMessage('Search is unavailable. Verify backend is running on port 8000.');
      setResults([]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <p className="eyebrow">PR-008</p>
      <h2>Search endpoint integration</h2>
      <p>Query the FastAPI search endpoint to jump into workspace and docs context.</p>

      <form className="searchPanel" onSubmit={handleSearch}>
        <label className="searchPanel__label" htmlFor="workspace-search">
          Search project content
        </label>
        <div className="searchPanel__controls">
          <input
            id="workspace-search"
            className="searchPanel__input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try: workspace, architecture, command"
          />
          <button type="submit" className="searchPanel__button" disabled={isLoading}>
            {isLoading ? 'Searching…' : 'Search'}
          </button>
        </div>

        {errorMessage ? <p className="searchPanel__error">{errorMessage}</p> : null}

        <ul className="searchPanel__results">
          {results.length === 0 && !isLoading ? (
            <li className="searchPanel__empty">No results yet. Run a search to populate results.</li>
          ) : (
            results.map((result) => (
              <li key={result.id} className="searchPanel__result">
                <p className="searchPanel__title">{result.title}</p>
                <p>{result.snippet}</p>
                <Link to={result.route} className="searchPanel__link">
                  Open {result.route}
                </Link>
              </li>
            ))
          )}
        </ul>
      </form>
    </section>
  );
}
