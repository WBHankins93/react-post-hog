export type SearchResult = {
  id: string;
  title: string;
  snippet: string;
  route: string;
};

export type SearchResponse = {
  query: string;
  count: number;
  results: SearchResult[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export async function searchWorkspace(query: string): Promise<SearchResponse> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return { query: trimmedQuery, count: 0, results: [] };
  }

  const searchParams = new URLSearchParams({ q: trimmedQuery });
  const response = await fetch(`${API_BASE_URL}/search?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Search request failed with status ${response.status}`);
  }

  return (await response.json()) as SearchResponse;
}
