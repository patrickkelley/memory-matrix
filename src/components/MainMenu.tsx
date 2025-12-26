import React from 'react';
import StatDisplay from './StatDisplay';

interface MainMenuProps {
  onStartGame: () => void;
  highScore: number;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, highScore }) => {
  return (
    <div>
      <h1>Memory Matrix</h1>
      <StatDisplay label="High Score" value={highScore} />
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
};

export default MainMenu;
