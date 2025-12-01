import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MemorizationPhase from './MemorizationPhase';

describe('MemorizationPhase', () => {
  it('renders the prompt and sequence text', () => {
    render(<MemorizationPhase sequence={'4567'} />);

    expect(screen.getByText(/Memorize the sequence/i)).toBeInTheDocument();
    const seqEl = screen.getByText('4567');
    expect(seqEl).toBeInTheDocument();
    expect(seqEl.className).toContain('sequence-text');
  });
});
