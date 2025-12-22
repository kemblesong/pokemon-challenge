import { useMemo } from 'react';
import { getWeaknesses, getResistances, getImmunities, TYPE_NAMES } from '../constants/typeChart';
import type { Pokemon, TypeName } from '../types/pokemon';
import { TypeBadge } from './TypeBadge';

interface TypeCoverageDisplayProps {
  team: Pokemon[];
}

interface CoverageData {
  weaknesses: Map<TypeName, { count: number; pokemon: string[] }>;
  resistances: Map<TypeName, { count: number; pokemon: string[] }>;
  immunities: Map<TypeName, string[]>;
  coverageGaps: TypeName[]; // Types that no team member resists or is immune to
}

export function TypeCoverageDisplay({ team }: TypeCoverageDisplayProps) {
  const coverage = useMemo((): CoverageData => {
    const weaknesses = new Map<TypeName, { count: number; pokemon: string[] }>();
    const resistances = new Map<TypeName, { count: number; pokemon: string[] }>();
    const immunities = new Map<TypeName, string[]>();

    for (const pokemon of team) {
      const types = pokemon.types.map((t) => t.type.name as TypeName);

      // Get this Pokemon's weaknesses
      const pokemonWeaknesses = getWeaknesses(types);
      for (const [type] of Object.entries(pokemonWeaknesses)) {
        const typeName = type as TypeName;
        const existing = weaknesses.get(typeName) || { count: 0, pokemon: [] };
        existing.count += 1;
        existing.pokemon.push(pokemon.name);
        weaknesses.set(typeName, existing);
      }

      // Get this Pokemon's resistances
      const pokemonResistances = getResistances(types);
      for (const [type] of Object.entries(pokemonResistances)) {
        const typeName = type as TypeName;
        const existing = resistances.get(typeName) || { count: 0, pokemon: [] };
        existing.count += 1;
        existing.pokemon.push(pokemon.name);
        resistances.set(typeName, existing);
      }

      // Get this Pokemon's immunities
      const pokemonImmunities = getImmunities(types);
      for (const type of pokemonImmunities) {
        const existing = immunities.get(type) || [];
        existing.push(pokemon.name);
        immunities.set(type, existing);
      }
    }

    // Calculate coverage gaps: types that no team member resists or is immune to
    const coveredTypes = new Set<TypeName>([
      ...resistances.keys(),
      ...immunities.keys(),
    ]);
    const coverageGaps = TYPE_NAMES.filter((type) => !coveredTypes.has(type));

    return { weaknesses, resistances, immunities, coverageGaps };
  }, [team]);

  if (team.length === 0) {
    return (
      <div className="type-coverage">
        <h3>Type Coverage</h3>
        <p className="placeholder">Add Pokemon to see type analysis</p>
      </div>
    );
  }

  // Sort weaknesses by count (most concerning first)
  const sortedWeaknesses = Array.from(coverage.weaknesses.entries()).sort(
    (a, b) => b[1].count - a[1].count
  );

  // Sort resistances by count
  const sortedResistances = Array.from(coverage.resistances.entries()).sort(
    (a, b) => b[1].count - a[1].count
  );

  const immunityList = Array.from(coverage.immunities.entries());

  return (
    <div className="type-coverage">
      <h3>Type Coverage</h3>

      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '0.875rem', color: '#ff6b6b', marginBottom: '0.5rem' }}>
          Weaknesses
        </h4>
        {sortedWeaknesses.length === 0 ? (
          <p style={{ color: '#666', fontSize: '0.875rem' }}>No weaknesses</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {sortedWeaknesses.map(([type, data]) => (
              <div
                key={type}
                title={`${data.pokemon.join(', ')} weak to ${type}`}
                style={{ position: 'relative' }}
              >
                <TypeBadge type={type} />
                {data.count > 1 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: '#ff4444',
                      color: 'white',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {data.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '0.875rem', color: '#6bff6b', marginBottom: '0.5rem' }}>
          Resistances
        </h4>
        {sortedResistances.length === 0 ? (
          <p style={{ color: '#666', fontSize: '0.875rem' }}>No resistances</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {sortedResistances.map(([type, data]) => (
              <div
                key={type}
                title={`${data.pokemon.join(', ')} resist ${type}`}
                style={{ position: 'relative' }}
              >
                <TypeBadge type={type} />
                {data.count > 1 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: '#44aa44',
                      color: 'white',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {data.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {immunityList.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.875rem', color: '#6b9fff', marginBottom: '0.5rem' }}>
            Immunities
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {immunityList.map(([type, pokemon]) => (
              <div key={type} title={`${pokemon.join(', ')} immune to ${type}`}>
                <TypeBadge type={type} />
              </div>
            ))}
          </div>
        </div>
      )}

      {coverage.coverageGaps.length > 0 && (
        <div>
          <h4 style={{ fontSize: '0.875rem', color: '#ffaa6b', marginBottom: '0.5rem' }}>
            Coverage Gaps
          </h4>
          <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
            No team member resists these types
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {coverage.coverageGaps.map((type) => (
              <div key={type} title={`No team member resists ${type}`}>
                <TypeBadge type={type} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
