import { describe, it, expect } from 'vitest';
import {
  TYPE_CHART,
  TYPE_NAMES,
  getDefensiveMultiplier,
  getWeaknesses,
  getResistances,
  getImmunities,
} from '../src/constants/typeChart';

describe('TYPE_CHART', () => {
  it('should contain all 18 types', () => {
    expect(TYPE_NAMES).toHaveLength(18);
    expect(Object.keys(TYPE_CHART)).toHaveLength(18);
  });

  it('should have fire super effective against grass', () => {
    expect(TYPE_CHART.fire.grass).toBe(2);
  });

  it('should have water super effective against fire', () => {
    expect(TYPE_CHART.water.fire).toBe(2);
  });

  it('should have normal immune to ghost', () => {
    expect(TYPE_CHART.normal.ghost).toBe(0);
  });

  it('should have ghost immune to normal', () => {
    expect(TYPE_CHART.ghost.normal).toBe(0);
  });
});

describe('getDefensiveMultiplier', () => {
  it('should return 2 for fire attacking grass', () => {
    expect(getDefensiveMultiplier('fire', ['grass'])).toBe(2);
  });

  it('should return 4 for fire attacking grass/bug', () => {
    expect(getDefensiveMultiplier('fire', ['grass', 'bug'])).toBe(4);
  });

  it('should return 0.25 for fire attacking water/rock', () => {
    expect(getDefensiveMultiplier('fire', ['water', 'rock'])).toBe(0.25);
  });

  it('should return 0 for ground attacking flying', () => {
    expect(getDefensiveMultiplier('ground', ['flying'])).toBe(0);
  });

  it('should return 0 for ground attacking flying/water (immunity overrides)', () => {
    // Flying is immune to ground, so the multiplier should be 0
    expect(getDefensiveMultiplier('ground', ['flying', 'water'])).toBe(0);
  });
});

describe('getWeaknesses', () => {
  it('should return fire weakness for grass type', () => {
    const weaknesses = getWeaknesses(['grass']);
    expect(weaknesses.fire).toBe(2);
    expect(weaknesses.ice).toBe(2);
    expect(weaknesses.flying).toBe(2);
    expect(weaknesses.poison).toBe(2);
    expect(weaknesses.bug).toBe(2);
  });

  it('should return 4x weakness for grass/bug to fire', () => {
    const weaknesses = getWeaknesses(['grass', 'bug']);
    expect(weaknesses.fire).toBe(4);
  });
});

describe('getResistances', () => {
  it('should return water resistance for water type', () => {
    const resistances = getResistances(['water']);
    expect(resistances.water).toBe(0.5);
    expect(resistances.fire).toBe(0.5);
  });

  it('should return 0.25x resistance for steel to normal', () => {
    const resistances = getResistances(['steel', 'rock']);
    expect(resistances.normal).toBe(0.25);
  });
});

describe('getImmunities', () => {
  it('should return ground immunity for flying type', () => {
    const immunities = getImmunities(['flying']);
    expect(immunities).toContain('ground');
  });

  it('should return ghost and normal immunities for normal/ghost type', () => {
    const immunities = getImmunities(['normal', 'ghost']);
    expect(immunities).toContain('ghost');
    expect(immunities).toContain('normal');
    expect(immunities).toContain('fighting');
  });
});
