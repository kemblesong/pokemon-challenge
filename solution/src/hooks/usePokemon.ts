import { useState, useEffect, useMemo } from 'react';
import { fetchPokemonList, fetchMultiplePokemon, filterPokemonByName, getPokemonIdFromUrl } from '../services/api';
import type { Pokemon } from '../types/pokemon';

export function usePokemon() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadPokemon() {
      try {
        setLoading(true);
        setError(null);

        // Fetch list of first 150 Pokemon
        const list = await fetchPokemonList(150, 0);

        // Get IDs from URLs and fetch all details in parallel
        const ids = list.results.map((p) => getPokemonIdFromUrl(p.url));
        const details = await fetchMultiplePokemon(ids);

        setAllPokemon(details);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Pokemon');
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  // Filter Pokemon based on search query
  const filteredPokemon = useMemo(() => {
    if (!searchQuery.trim()) {
      return allPokemon;
    }

    const filtered = filterPokemonByName(searchQuery, allPokemon);
    return allPokemon.filter((p) => filtered.some((f) => f.name === p.name));
  }, [allPokemon, searchQuery]);

  return {
    pokemon: filteredPokemon,
    loading,
    error,
    searchQuery,
    setSearchQuery,
  };
}
