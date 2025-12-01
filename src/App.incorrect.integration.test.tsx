import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act } from 'react';

// Mock the game logic module to produce deterministic outputs and force incorrect validation
vi.mock('./lib/gameLogic', () => {
  return {
    generateSequence: () => '456',
    validateInput: () => false, // always incorrect
    calculateNewLevel: (currentLevel: number, wasCorrect: boolean) =>
      wasCorrect ? currentLevel + 1 : Math.max(1, currentLevel - 1),
  };
});

import App from './App';

describe('App incorrect-round integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('handles an incorrect submission and transitions back to memorization', () => {
    render(<App />);

    // Start the game
    fireEvent.click(screen.getByText('Start Game'));

    // Memorization should show mocked sequence
    expect(screen.getByText(/Memorize the sequence/i)).toBeInTheDocument();
    expect(screen.getByText('456')).toBeInTheDocument();

    // advance timers to transition
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // click Next to go to input
    fireEvent.click(screen.getByText('Next'));

    // enter wrong input (anything) and submit
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('Submit'));

    // should show Incorrect feedback and reveal correct sequence
    expect(screen.getByText(/Incorrect!/i)).toBeInTheDocument();
    expect(screen.getByText(/The correct sequence was:/i)).toBeInTheDocument();
    expect(screen.getByText(/456/)).toBeInTheDocument();

    // Level should remain floored at 1
    expect(screen.getByText(/Current Level: 1/)).toBeInTheDocument();

    // advance timers to move back to memorization
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // back in memorization phase showing sequence again
    expect(screen.getByText(/Memorize the sequence/i)).toBeInTheDocument();
    expect(screen.getByText('456')).toBeInTheDocument();
  });
});
