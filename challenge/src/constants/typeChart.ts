import type { TypeName } from '../types/pokemon';

/**
 * Complete Pokemon type effectiveness chart
 * Based on Generation 6+ type matchups (includes Fairy type)
 *
 * Usage: TYPE_CHART[attackingType][defendingType] = multiplier
 * - 0 = Immune (no damage)
 * - 0.5 = Not very effective (half damage)
 * - 1 = Normal effectiveness
 * - 2 = Super effective (double damage)
 */

export const TYPE_NAMES: TypeName[] = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

type TypeChart = Record<TypeName, Record<TypeName, number>>;

export const TYPE_CHART: TypeChart = {
  normal: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 0.5, ghost: 0, dragon: 1, dark: 1, steel: 0.5, fairy: 1,
  },
  fire: {
    normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 2,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2,
    rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 2, fairy: 1,
  },
  water: {
    normal: 1, fire: 2, water: 0.5, electric: 1, grass: 0.5, ice: 1,
    fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1, bug: 1,
    rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1,
  },
  electric: {
    normal: 1, fire: 1, water: 2, electric: 0.5, grass: 0.5, ice: 1,
    fighting: 1, poison: 1, ground: 0, flying: 2, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1,
  },
  grass: {
    normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 1,
    fighting: 1, poison: 0.5, ground: 2, flying: 0.5, psychic: 1, bug: 0.5,
    rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 1,
  },
  ice: {
    normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 0.5,
    fighting: 1, poison: 1, ground: 2, flying: 2, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 1,
  },
  fighting: {
    normal: 2, fire: 1, water: 1, electric: 1, grass: 1, ice: 2,
    fighting: 1, poison: 0.5, ground: 1, flying: 0.5, psychic: 0.5, bug: 0.5,
    rock: 2, ghost: 0, dragon: 1, dark: 2, steel: 2, fairy: 0.5,
  },
  poison: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 2, ice: 1,
    fighting: 1, poison: 0.5, ground: 0.5, flying: 1, psychic: 1, bug: 1,
    rock: 0.5, ghost: 0.5, dragon: 1, dark: 1, steel: 0, fairy: 2,
  },
  ground: {
    normal: 1, fire: 2, water: 1, electric: 2, grass: 0.5, ice: 1,
    fighting: 1, poison: 2, ground: 1, flying: 0, psychic: 1, bug: 0.5,
    rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1,
  },
  flying: {
    normal: 1, fire: 1, water: 1, electric: 0.5, grass: 2, ice: 1,
    fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2,
    rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1,
  },
  psychic: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 2, poison: 2, ground: 1, flying: 1, psychic: 0.5, bug: 1,
    rock: 1, ghost: 1, dragon: 1, dark: 0, steel: 0.5, fairy: 1,
  },
  bug: {
    normal: 1, fire: 0.5, water: 1, electric: 1, grass: 2, ice: 1,
    fighting: 0.5, poison: 0.5, ground: 1, flying: 0.5, psychic: 2, bug: 1,
    rock: 1, ghost: 0.5, dragon: 1, dark: 2, steel: 0.5, fairy: 0.5,
  },
  rock: {
    normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 2,
    fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1, bug: 2,
    rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1,
  },
  ghost: {
    normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1,
    rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 1,
  },
  dragon: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 0,
  },
  dark: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1,
    rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 0.5,
  },
  steel: {
    normal: 1, fire: 0.5, water: 0.5, electric: 0.5, grass: 1, ice: 2,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 2,
  },
  fairy: {
    normal: 1, fire: 0.5, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 2, poison: 0.5, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 2, dark: 2, steel: 0.5, fairy: 1,
  },
};

/**
 * Calculate the defensive multiplier for an attack against a Pokemon
 * @param attackingType - The type of the incoming attack
 * @param defendingTypes - The type(s) of the defending Pokemon
 * @returns The damage multiplier (0, 0.25, 0.5, 1, 2, or 4)
 */
export function getDefensiveMultiplier(
  attackingType: TypeName,
  defendingTypes: TypeName[]
): number {
  return defendingTypes.reduce(
    (multiplier, defType) => multiplier * TYPE_CHART[attackingType][defType],
    1
  );
}

/**
 * Get all weaknesses for a Pokemon based on its types
 * @param types - The Pokemon's types
 * @returns Record of type name to damage multiplier for weaknesses (> 1)
 */
export function getWeaknesses(types: TypeName[]): Record<TypeName, number> {
  const weaknesses: Partial<Record<TypeName, number>> = {};

  for (const attackType of TYPE_NAMES) {
    const multiplier = getDefensiveMultiplier(attackType, types);
    if (multiplier > 1) {
      weaknesses[attackType] = multiplier;
    }
  }

  return weaknesses as Record<TypeName, number>;
}

/**
 * Get all resistances for a Pokemon based on its types
 * @param types - The Pokemon's types
 * @returns Record of type name to damage multiplier for resistances (< 1 and > 0)
 */
export function getResistances(types: TypeName[]): Record<TypeName, number> {
  const resistances: Partial<Record<TypeName, number>> = {};

  for (const attackType of TYPE_NAMES) {
    const multiplier = getDefensiveMultiplier(attackType, types);
    if (multiplier < 1 && multiplier > 0) {
      resistances[attackType] = multiplier;
    }
  }

  return resistances as Record<TypeName, number>;
}

/**
 * Get all immunities for a Pokemon based on its types
 * @param types - The Pokemon's types
 * @returns Array of type names the Pokemon is immune to
 */
export function getImmunities(types: TypeName[]): TypeName[] {
  const immunities: TypeName[] = [];

  for (const attackType of TYPE_NAMES) {
    const multiplier = getDefensiveMultiplier(attackType, types);
    if (multiplier === 0) {
      immunities.push(attackType);
    }
  }

  return immunities;
}
