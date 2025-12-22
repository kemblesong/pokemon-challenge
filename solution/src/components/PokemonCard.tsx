import { getPokemonSprite } from '../services/api';
import type { Pokemon, TypeName } from '../types/pokemon';
import { TypeBadge } from './TypeBadge';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
  disabled?: boolean;
}

export function PokemonCard({ pokemon, onClick, disabled }: PokemonCardProps) {
  const sprite = getPokemonSprite(pokemon);

  return (
    <div
      className={`pokemon-card ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <img src={sprite} alt={pokemon.name} loading="lazy" />
      <div className="name">{pokemon.name}</div>
      <div className="types">
        {pokemon.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name as TypeName} />
        ))}
      </div>
    </div>
  );
}
