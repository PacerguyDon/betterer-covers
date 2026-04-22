import type { TraktContext, TraktList, TraktListItem } from '../types'

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server returned an error:", errorText);
    throw new Error(`Server error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");

  // ADD THESE LINES TO SEE THE TRUTH:
  if (!contentType || !contentType.includes("application/json")) {
    const mysteriousText = await response.text();
    console.log("DEBUG - What is this if not JSON?", mysteriousText);
    throw new Error(`The string did not match the expected pattern: Received ${contentType}`);
  }

  return response.json();
}

export function fetchTraktContext(signal?: AbortSignal) {
  return fetchJson<TraktContext>('/api/trakt/context', signal);
}

export function fetchListsForUser(user: string, signal?: AbortSignal) {
  return fetchJson<TraktList[]>(`/api/trakt/users/${encodeURIComponent(user)}/lists`, signal);
}

export function fetchListItemsForUser(user: string, slug: string, signal?: AbortSignal) {
  return fetchJson<TraktListItem[]>(`/api/trakt/users/${encodeURIComponent(user)}/lists/${encodeURIComponent(slug)}/items`, signal);
}

export const toPosterProxyUrl: any = (url: string | null) => {
  return url ?? '';
};




