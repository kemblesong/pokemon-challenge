# Pokemon Team Builder

Welcome to the Pokemon Team Builder coding challenge! This is a **1-hour live coding interview** where you'll build a React application using the [PokeAPI](https://pokeapi.co/).

## Overview

Build a Pokemon Team Builder that allows users to:
- Browse and search for Pokemon
- Build a team of up to 6 Pokemon
- View type coverage analysis for their team

## Understanding Pokemon Type Coverage

If you're not familiar with Pokemon, here's a quick primer on the type system:

### Pokemon Types
Every Pokemon has one or two **types** (e.g., Fire, Water, Grass, Electric). There are 18 types in total. These types determine how much damage a Pokemon takes from attacks.

### Type Effectiveness
When a Pokemon is attacked, the damage is modified based on type matchups:

| Multiplier | Term | Example |
|------------|------|---------|
| **2x** | Super effective | Water → Fire |
| **1x** | Normal damage | Normal → Normal |
| **0.5x** | Not very effective | Fire → Water |
| **0x** | No effect (immune) | Ground → Flying |

For dual-type Pokemon, multipliers stack. A Fire/Flying Pokemon takes **4x** damage from Rock (2x × 2x).

### What is Type Coverage?
**Type coverage** refers to how well your team handles different attacking types:

- **Weaknesses**: Types that deal super effective damage to your team
- **Resistances**: Types that deal reduced damage to your team
- **Coverage gaps**: Types that threaten multiple Pokemon on your team

### Why It Matters
A well-balanced team minimizes shared weaknesses. If your entire team is weak to Ice-type attacks, a single Ice Pokemon could sweep through all six of your Pokemon. Good type coverage means having Pokemon that can switch in to resist common threats.

## Getting Started

This is a **Deno monorepo** with two packages:
- `challenge/` - The scaffold to work on during the interview
- `solution/` - Reference implementation

### Prerequisites

Install [Deno](https://deno.land/) (v2.0 or later):
```bash
curl -fsSL https://deno.land/install.sh | sh
```

### Running the Challenge

```bash
# Start the development server
deno task dev:challenge

# Run tests
deno task test:challenge

# Build for production
deno task build:challenge
```

### Running from Within a Package

```bash
cd challenge
deno task dev
deno task test
deno task build
```

## Requirements

### Core Features (Prioritized)

Given the time constraint, focus on these features in order:

#### 1. Pokemon Browser (~20 min)
- Fetch and display a list of Pokemon from the API
- Implement search/filter by name
- Show Pokemon cards with: sprite, name, and types
- Handle loading and error states

#### 2. Team Builder (~20 min)
- Add Pokemon to a team (maximum 6)
- Remove Pokemon from the team
- Display the current team with Pokemon details
- Prevent adding duplicates

#### 3. Type Coverage Analysis (~15 min)
- Calculate and display the team's type weaknesses
- Calculate and display the team's type resistances
- Show a visual representation (badges, chart, etc.)

### Technical Expectations
- Clean component architecture
- Proper TypeScript usage (avoid `any`)
- Error handling for API calls
- Clear, readable code

### Stretch Goals (if time permits)
- Persist team to localStorage
- Show coverage gaps (types that could threaten your team)
- Drag-and-drop team reordering

## What's Provided

To save time on boilerplate, we've included:

| File | Description |
|------|-------------|
| `src/types/pokemon.ts` | TypeScript interfaces for PokeAPI data |
| `src/constants/typeChart.ts` | Complete type effectiveness chart (18x18) |
| `src/constants/typeColors.ts` | UI colors for each Pokemon type |
| `src/services/api.ts` | Basic API fetch helpers |
| `src/App.tsx` | Application shell to build from |

## API Reference

Base URL: `https://pokeapi.co/api/v2`

### Endpoints You'll Need

```
GET /pokemon?limit=20&offset=0     # List Pokemon (paginated)
GET /pokemon/{name}                 # Get Pokemon details
GET /type/{name}                    # Get type info (damage relations)
```

### Example Responses

**List Pokemon:**
```json
{
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
  ]
}
```

**Pokemon Details:** (simplified)
```json
{
  "id": 25,
  "name": "pikachu",
  "types": [{ "slot": 1, "type": { "name": "electric" } }],
  "sprites": { "front_default": "https://..." },
  "stats": [{ "base_stat": 35, "stat": { "name": "hp" } }]
}
```

## Project Structure

```
pokemon-challenge/
├── deno.json           # Workspace configuration
├── challenge/          # Work on this during the interview
│   ├── deno.json
│   ├── src/
│   │   ├── components/ # Your components go here
│   │   ├── hooks/      # Custom hooks
│   │   ├── utils/      # Utility functions
│   │   ├── types/      # TypeScript types (provided)
│   │   ├── constants/  # Type chart & colors (provided)
│   │   ├── services/   # API helpers (provided)
│   │   └── App.tsx     # Start here!
│   └── tests/
└── solution/           # Reference implementation
```

## Available Tasks

From the root directory:
```bash
deno task dev:challenge      # Start challenge dev server
deno task dev:solution       # Start solution dev server
deno task test:challenge     # Test challenge package
deno task test:solution      # Test solution package
deno task test               # Test all packages
deno task build:challenge    # Build challenge for production
deno task build:solution     # Build solution for production
deno lint                    # Lint all code
deno fmt                     # Format all code
```

## Tips

1. **Think out loud** - We want to understand your thought process
2. **Ask questions** - Clarify requirements if needed
3. **Prioritize** - It's okay not to finish everything; show good judgment
4. **Keep it simple** - Don't over-engineer; solve the problem at hand
5. **Use the provided helpers** - The type chart and API service are there to save you time

Good luck! Have fun building your Pokemon team!
