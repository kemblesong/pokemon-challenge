import "./App.css";

/**
 * Pokemon Team Builder
 *
 * Your task: Build a Pokemon team builder with type coverage analysis
 *
 * Requirements:
 * 1. Pokemon Browser - Search and display Pokemon from the API
 * 2. Team Builder - Add/remove Pokemon to build a team of 6
 * 3. Type Coverage - Show team weaknesses and resistances
 *
 * Helpful imports you might need:
 * - import { fetchPokemonList, fetchPokemon } from './services/api'
 * - import { TYPE_CHART, getWeaknesses, getResistances } from './constants/typeChart'
 * - import { TYPE_COLORS } from './constants/typeColors'
 * - import type { Pokemon, TypeName } from './types/pokemon'
 *
 * Good luck!
 */

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Pokemon Team Builder</h1>
        <p>Build your team and analyze type coverage</p>
      </header>

      <main className="main">
        <section className="pokemon-browser">
          <h2>Pokemon Browser</h2>
          {/* TODO: Add search input */}
          {/* TODO: Display Pokemon list */}
          <p className="placeholder">
            Implement Pokemon search and display here
          </p>
        </section>

        <section className="team-builder">
          <h2>Your Team (0/6)</h2>
          {/* TODO: Display team slots */}
          {/* TODO: Show type coverage analysis */}
          <div className="team-slots">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="team-slot empty">
                <span className="slot-number">{index + 1}</span>
                <span className="slot-placeholder">Empty</span>
              </div>
            ))}
          </div>

          <div className="type-coverage">
            <h3>Type Coverage</h3>
            <p className="placeholder">Add Pokemon to see type analysis</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
