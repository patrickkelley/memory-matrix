import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateSequence } from './gameLogic';

describe('generateSequence randomness and edge cases', () => {
  beforeEach(() => {
    // Ensure any previous mocks are cleared
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates correct length for several sizes', () => {
    expect(generateSequence(1)).toHaveLength(1);
    expect(generateSequence(5)).toHaveLength(5);
    expect(generateSequence(12)).toHaveLength(12);
  });

  it('produces digits 0-9 when Math.random spans [0,1)', () => {
    // Mock Math.random to return values that produce digits 0..9
    const randomValues = Array.from({ length: 10 }, (_, i) => i / 10 + 0.001);
    let call = 0;
    const spy = vi.spyOn(Math, 'random').mockImplementation(() => {
      const v = randomValues[call % randomValues.length];
      call++;
      return v;
    });

    const seq = generateSequence(10);
    // Expect sequence '0'..'9' (since Math.floor(i/10 + 0.001 * 10) -> i)
    expect(seq).toMatch(/^[0-9]{10}$/);
    // Ensure each character is unique 0-9 in this mocked scenario
    const chars = seq.split('');
    expect(new Set(chars).size).toBe(10);
  });

  it('is deterministic when Math.random is stubbed', () => {
    const spy = vi.spyOn(Math, 'random').mockImplementation(() => 0.42);
    const s1 = generateSequence(5);
    const s2 = generateSequence(5);
    // With constant random, sequences should be identical
    expect(s1).toBe(s2);
    spy.mockRestore();
  });
});
