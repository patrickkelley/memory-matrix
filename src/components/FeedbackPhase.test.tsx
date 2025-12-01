import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeedbackPhase from './FeedbackPhase';

describe('FeedbackPhase', () => {
  it('shows correct feedback when isCorrect is true', () => {
    render(<FeedbackPhase isCorrect={true} correctSequence={'123'} />);

    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    const correctEl = screen.getByText(/Correct!/i);
    expect(correctEl.className).toContain('feedback-correct');
  });

  it('shows incorrect feedback and reveals correct sequence when isCorrect is false', () => {
    render(<FeedbackPhase isCorrect={false} correctSequence={'987'} />);

    expect(screen.getByText(/Incorrect!/i)).toBeInTheDocument();
    expect(screen.getByText(/The correct sequence was:/i)).toBeInTheDocument();
    expect(screen.getByText(/987/)).toBeInTheDocument();
  });
});
