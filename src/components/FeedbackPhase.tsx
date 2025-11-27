import React from 'react';

interface FeedbackPhaseProps {
  isCorrect: boolean;
  correctSequence: string;
}

const FeedbackPhase: React.FC<FeedbackPhaseProps> = ({ isCorrect, correctSequence }) => {
  return (
    <div>
      {isCorrect ? (
        <div>
          <h2 className="feedback-correct">Correct!</h2>
        </div>
      ) : (
        <div className="feedback-incorrect">
          <h2>Incorrect!</h2>
          <p>The correct sequence was: {correctSequence}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackPhase;
