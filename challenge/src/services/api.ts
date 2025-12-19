import type {
  Pokemon,
  PokemonListResponse,
  TypeInfo,
} from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a paginated list of Pokemon
 * @param limit - Number of Pokemon to fetch (default: 20)
 * @param offset - Starting index (default: 0)
 */
export async function fetchPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  return fetchFromAPI<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
}

/**
 * Fetch detailed information for a specific Pokemon
 * @param nameOrId - Pokemon name or ID
 */
export async function fetchPokemon(nameOrId: string | number): Promise<Pokemon> {
  return fetchFromAPI<Pokemon>(`/pokemon/${nameOrId}`);
}

/**
 * Fetch information about a specific type
 * @param nameOrId - Type name or ID
 */
export async function fetchType(nameOrId: string | number): Promise<TypeInfo> {
  return fetchFromAPI<TypeInfo>(`/type/${nameOrId}`);
}

/**
 * Fetch multiple Pokemon in parallel
 * @param namesOrIds - Array of Pokemon names or IDs
 */
export async function fetchMultiplePokemon(
  namesOrIds: (string | number)[]
): Promise<Pokemon[]> {
  const promises = namesOrIds.map((nameOrId) => fetchPokemon(nameOrId));
  return Promise.all(promises);
}

/**
 * Search Pokemon by name from a list
 * Note: PokeAPI doesn't have a search endpoint, so we fetch all and filter
 * For a real app, you might want to implement server-side search
 * @param query - Search query
 * @param pokemonList - List of Pokemon to search through
 */
export function filterPokemonByName(
  query: string,
  pokemonList: { name: string }[]
): { name: string }[] {
  const lowercaseQuery = query.toLowerCase().trim();

  if (!lowercaseQuery) {
    return pokemonList;
  }

  return pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Extract Pokemon ID from a PokeAPI URL
 * @param url - Full PokeAPI URL (e.g., "https://pokeapi.co/api/v2/pokemon/25/")
 * @returns Pokemon ID
 */
export function getPokemonIdFromUrl(url: string): number {
  const matches = url.match(/\/pokemon\/(\d+)\/?$/);
  return matches ? parseInt(matches[1], 10) : 0;
}

/**
 * Get the sprite URL for a Pokemon
 * Falls back to default sprite if official artwork is unavailable
 * @param pokemon - Pokemon object
 * @returns Sprite URL or placeholder
 */
export function getPokemonSprite(pokemon: Pokemon): string {
  return (
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default ??
    '/pokeball.svg' // Fallback to pokeball icon
  );
}
