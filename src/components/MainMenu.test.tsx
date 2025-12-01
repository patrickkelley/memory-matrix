import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MainMenu from './MainMenu';

describe('MainMenu', () => {
  it('renders title, high score and Start Game button', () => {
    const onStart = vi.fn();
    render(<MainMenu onStartGame={onStart} highScore={5} />);

    expect(screen.getByText(/Memory Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/High Score:/i)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /Start Game/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(onStart).toHaveBeenCalled();
  });
});
