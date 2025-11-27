import React from 'react';

interface MainMenuProps {
  onStartGame: () => void;
  highScore: number;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, highScore }) => {
  return (
    <div>
      <h1>Memory Matrix</h1>
      <p>High Score: {highScore}</p>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
};

export default MainMenu;
