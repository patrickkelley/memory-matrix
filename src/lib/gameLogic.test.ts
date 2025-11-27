import { describe, it, expect } from 'vitest';
import { generateSequence, validateInput, calculateNewLevel } from './gameLogic';

describe('gameLogic', () => {
  // Test for generateSequence
  describe('generateSequence', () => {
    it('should generate a sequence of the correct length', () => {
      expect(generateSequence(1)).toHaveLength(1);
      expect(generateSequence(5)).toHaveLength(5);
      expect(generateSequence(10)).toHaveLength(10);
    });

    it('should generate a sequence containing only digits', () => {
      const sequence = generateSequence(10);
      expect(sequence).toMatch(/^[0-9]+$/);
    });

    it('should generate a different sequence on each call', () => {
      const seq1 = generateSequence(10);
      const seq2 = generateSequence(10);
      expect(seq1).not.toBe(seq2);
    });
  });

  // Test for validateInput
  describe('validateInput', () => {
    it('should return true for correct input', () => {
      expect(validateInput('12345', '12345')).toBe(true);
    });

    it('should return false for incorrect input', () => {
      expect(validateInput('12345', '54321')).toBe(false);
    });

    it('should return false for input of different length', () => {
      expect(validateInput('123', '12345')).toBe(false);
    });

    it('should return false for empty input', () => {
      expect(validateInput('', '12345')).toBe(false);
    });
  });

  // Tests for calculateNewLevel (covering F-1.2 and F-1.4)
  describe('calculateNewLevel', () => {
    it('should increase level by 1 on correct input (F-1.2)', () => {
      expect(calculateNewLevel(1, true)).toBe(2);
      expect(calculateNewLevel(5, true)).toBe(6);
    });

    it('should decrease level by 1 on incorrect input from a level > 1', () => {
      expect(calculateNewLevel(5, false)).toBe(4);
      expect(calculateNewLevel(2, false)).toBe(1);
    });

    it('should not decrease level below 1 on incorrect input (F-1.4)', () => {
      expect(calculateNewLevel(1, false)).toBe(1);
    });
  });
});
