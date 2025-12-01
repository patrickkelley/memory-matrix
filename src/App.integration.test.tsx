import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act } from 'react';

// Mock the game logic module before importing App so App receives the mocked functions
vi.mock('./lib/gameLogic', () => {
  return {
    generateSequence: () => '123',
    validateInput: (input: string, seq: string) => input === seq,
    calculateNewLevel: (currentLevel: number, wasCorrect: boolean) =>
      wasCorrect ? currentLevel + 1 : Math.max(1, currentLevel - 1),
  };
});

import App from './App';

describe('App integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('runs through one successful round and updates level/high-score', () => {
    render(<App />);

    // initial UI (there can be multiple nodes that show High Score)
    const highScoreNodes = screen.getAllByText(/High Score:/i);
    expect(highScoreNodes.length).toBeGreaterThan(0);
    expect(screen.getByText(/Current Level:/i)).toBeInTheDocument();

    // start game
    fireEvent.click(screen.getByText('Start Game'));

    // memorization phase should show sequence '123'
    expect(screen.getByText(/Memorize the sequence/i)).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();

    // advance timers to transition
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // should show Next button (transition)
    fireEvent.click(screen.getByText('Next'));

    // input phase: click digits and submit
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('Submit'));

    // feedback should show Correct!
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();

    // level & high score should have increased to 2
    expect(screen.getByText(/Current Level: 2/)).toBeInTheDocument();
    expect(screen.getByText(/High Score: 2/)).toBeInTheDocument();
  });
});
