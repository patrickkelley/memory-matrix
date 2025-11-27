import React from 'react';

interface MemorizationPhaseProps {
  sequence: string;
}

const MemorizationPhase: React.FC<MemorizationPhaseProps> = ({ sequence }) => {
  return (
    <div>
      <p>Memorize the sequence:</p>
      <div className="sequence-text">{sequence}</div>
    </div>
  );
};

export default MemorizationPhase;
