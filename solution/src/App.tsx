import { useState } from 'react';
import './App.css';
import { usePokemon } from './hooks/usePokemon';
import { useTeam } from './hooks/useTeam';
import { PokemonCard } from './components/PokemonCard';
import { TeamSlot } from './components/TeamSlot';
import { TypeCoverageDisplay } from './components/TypeCoverageDisplay';

function App() {
  const { pokemon, loading, error, searchQuery, setSearchQuery } = usePokemon();
  const { team, addToTeam, removeFromTeam, isInTeam, reorderTeam } = useTeam();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  return (
    <div className="app">
      <header className="header">
        <h1>Pokemon Team Builder</h1>
        <p>Build your team and analyze type coverage</p>
      </header>

      <main className="main">
        <section className="pokemon-browser">
          <h2>Pokemon Browser</h2>

          <input
            type="text"
            className="search-input"
            placeholder="Search Pokemon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {loading && <div className="loading">Loading Pokemon...</div>}

          {error && <div className="error">{error}</div>}

          {!loading && !error && (
            <div className="pokemon-grid">
              {pokemon.map((p) => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  onClick={() => addToTeam(p)}
                  disabled={isInTeam(p.id)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="team-builder">
          <h2>Your Team ({team.length}/6)</h2>

          <div className="team-slots">
            {[...Array(6)].map((_, index) => (
              <TeamSlot
                key={index}
                pokemon={team[index] || null}
                slotIndex={index}
                onRemove={() => team[index] && removeFromTeam(team[index].id)}
                isDragging={draggedIndex === index}
                onDragStart={() => setDraggedIndex(index)}
                onDragEnd={() => setDraggedIndex(null)}
                onDrop={(fromIndex) => reorderTeam(fromIndex, index)}
                draggedIndex={draggedIndex}
              />
            ))}
          </div>

          <TypeCoverageDisplay team={team} />
        </section>
      </main>
    </div>
  );
}

export default App;
