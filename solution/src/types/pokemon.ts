/**
 * TypeScript interfaces for PokeAPI responses
 * Documentation: https://pokeapi.co/docs/v2
 */

// ============================================
// API Response Types
// ============================================

/** Paginated list response from /pokemon endpoint */
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

/** Individual item in the Pokemon list */
export interface PokemonListItem {
  name: string;
  url: string;
}

// ============================================
// Pokemon Types
// ============================================

/** Full Pokemon data from /pokemon/{id} endpoint */
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeSlot[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

/** Pokemon type assignment (slot indicates primary/secondary) */
export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

/** Pokemon sprite URLs */
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

/** Pokemon base stat */
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

/** Pokemon ability */
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

// ============================================
// Type Information
// ============================================

/** Type data from /type/{id} endpoint */
export interface TypeInfo {
  id: number;
  name: string;
  damage_relations: TypeDamageRelations;
  pokemon: TypePokemon[];
}

/** Type effectiveness relationships */
export interface TypeDamageRelations {
  /** Types this type deals 2x damage to */
  double_damage_to: TypeReference[];
  /** Types this type deals 0.5x damage to */
  half_damage_to: TypeReference[];
  /** Types this type deals 0x damage to */
  no_damage_to: TypeReference[];
  /** Types that deal 2x damage to this type */
  double_damage_from: TypeReference[];
  /** Types that deal 0.5x damage to this type */
  half_damage_from: TypeReference[];
  /** Types that deal 0x damage to this type */
  no_damage_from: TypeReference[];
}

/** Reference to a type */
export interface TypeReference {
  name: string;
  url: string;
}

/** Pokemon that has this type */
export interface TypePokemon {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

// ============================================
// Team Types
// ============================================

/** A Pokemon team */
export interface Team {
  id: string;
  name: string;
  pokemon: (Pokemon | null)[]; // 6 slots, can have empty slots
  createdAt: number;
  updatedAt: number;
}

/** Team's type coverage analysis */
export interface TypeCoverage {
  /** Types the team is weak to: type name -> multiplier (2 or 4) */
  weaknesses: Record<string, number>;
  /** Types the team resists: type name -> multiplier (0.5 or 0.25) */
  resistances: Record<string, number>;
  /** Types the team is immune to */
  immunities: string[];
}

// ============================================
// Utility Types
// ============================================

/** All Pokemon type names */
export type TypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

/** Stat names */
export type StatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed';
