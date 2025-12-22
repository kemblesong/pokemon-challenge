import { useState, useCallback, useEffect } from 'react';
import type { Pokemon } from '../types/pokemon';

const MAX_TEAM_SIZE = 6;
const STORAGE_KEY = 'pokemon-team';

function loadTeamFromStorage(): Pokemon[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load team from localStorage:', e);
  }
  return [];
}

function saveTeamToStorage(team: Pokemon[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
  } catch (e) {
    console.warn('Failed to save team to localStorage:', e);
  }
}

export function useTeam() {
  const [team, setTeam] = useState<Pokemon[]>(() => loadTeamFromStorage());

  // Persist team to localStorage whenever it changes
  useEffect(() => {
    saveTeamToStorage(team);
  }, [team]);

  const addToTeam = useCallback((pokemon: Pokemon): boolean => {
    let success = false;

    setTeam((current) => {
      // Check if team is full
      if (current.length >= MAX_TEAM_SIZE) {
        return current;
      }

      // Check for duplicates
      if (current.some((p) => p.id === pokemon.id)) {
        return current;
      }

      success = true;
      return [...current, pokemon];
    });

    return success;
  }, []);

  const removeFromTeam = useCallback((pokemonId: number) => {
    setTeam((current) => current.filter((p) => p.id !== pokemonId));
  }, []);

  const isInTeam = useCallback(
    (pokemonId: number): boolean => {
      return team.some((p) => p.id === pokemonId);
    },
    [team]
  );

  const reorderTeam = useCallback((fromIndex: number, toIndex: number) => {
    setTeam((current) => {
      if (
        fromIndex < 0 ||
        fromIndex >= current.length ||
        toIndex < 0 ||
        toIndex >= current.length ||
        fromIndex === toIndex
      ) {
        return current;
      }

      const newTeam = [...current];
      const [removed] = newTeam.splice(fromIndex, 1);
      newTeam.splice(toIndex, 0, removed);
      return newTeam;
    });
  }, []);

  return {
    team,
    addToTeam,
    removeFromTeam,
    isInTeam,
    reorderTeam,
    isFull: team.length >= MAX_TEAM_SIZE,
  };
}
