import type { TypeName } from '../types/pokemon';

/**
 * Color palette for Pokemon types
 * Colors based on the official Pokemon type colors
 */

export const TYPE_COLORS: Record<TypeName, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

/**
 * Get a contrasting text color (black or white) for a given type
 * @param type - The Pokemon type
 * @returns '#000' for light backgrounds, '#fff' for dark backgrounds
 */
export function getTypeTextColor(type: TypeName): string {
  const lightTypes: TypeName[] = [
    'normal',
    'electric',
    'grass',
    'ice',
    'ground',
    'flying',
    'bug',
    'rock',
    'steel',
    'fairy',
  ];

  return lightTypes.includes(type) ? '#000' : '#fff';
}

/**
 * CSS custom properties for type colors
 * Can be used to generate CSS variables
 */
export function getTypeCSSVariables(): string {
  return Object.entries(TYPE_COLORS)
    .map(([type, color]) => `--type-${type}: ${color};`)
    .join('\n  ');
}
