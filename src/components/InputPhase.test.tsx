import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputPhase from './InputPhase';

describe('InputPhase', () => {
  it('should display the typed numbers in the input field', () => {
    const handleSubmit = vi.fn();
    render(<InputPhase onSubmit={handleSubmit} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));

    expect(input).toHaveValue('123');
  });

  it('should call onSubmit with the input value when Submit is clicked', () => {
    const handleSubmit = vi.fn();
    render(<InputPhase onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));

    fireEvent.click(screen.getByText('Submit'));

    expect(handleSubmit).toHaveBeenCalledWith('123');
  });

  it('should clear the input when Clear is clicked', () => {
    const handleSubmit = vi.fn();
    render(<InputPhase onSubmit={handleSubmit} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));

    expect(input).toHaveValue('123');

    fireEvent.click(screen.getByText('C'));

    expect(input).toHaveValue('');
  });
});
