import { useState, useEffect } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import MemorizationPhase from './components/MemorizationPhase';
import InputPhase from './components/InputPhase';
import FeedbackPhase from './components/FeedbackPhase';
import { generateSequence, validateInput, calculateNewLevel } from './lib/gameLogic';

// Define the different states of the game
type GameState = 'main_menu' | 'memorization' | 'transition' | 'input' | 'feedback';

const HIGH_SCORE_KEY = 'memoryMatrixHighScore';

function App() {
  const [gameState, setGameState] = useState<GameState>('main_menu');
  const [digitLevel, setDigitLevel] = useState(1);
  const [highScore, setHighScore] = useState(1);
  const [sequence, setSequence] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  // Load high score from local storage on initial render
  useEffect(() => {
    const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Effect for handling game state logic and timers
  useEffect(() => {
    if (gameState === 'memorization') {
      setSequence(generateSequence(digitLevel));
      const memorizationTime = 1500 + 500 * digitLevel;
      const timer = setTimeout(() => {
        setGameState('transition');
      }, memorizationTime);
      return () => clearTimeout(timer);
    }

    if (gameState === 'feedback') {
      const timer = setTimeout(() => {
        setGameState('memorization');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState, digitLevel]);

  const handleStartGame = () => {
    setDigitLevel(1);
    setGameState('memorization');
  };

  const handleSubmission = (inputValue: string) => {
    const correct = validateInput(inputValue, sequence);
    setIsCorrect(correct);
    const newLevel = calculateNewLevel(digitLevel, correct);
    setDigitLevel(newLevel);
    if (newLevel > highScore) {
      setHighScore(newLevel);
      localStorage.setItem(HIGH_SCORE_KEY, newLevel.toString());
    }
    setGameState('feedback');
  };

  // Render different components based on the game state
  const renderGameState = () => {
    switch (gameState) {
      case 'main_menu':
        return <MainMenu onStartGame={handleStartGame} highScore={highScore} />;
      case 'memorization':
        return <MemorizationPhase sequence={sequence} />;
      case 'transition':
        return <button onClick={() => setGameState('input')}>Next</button>;
      case 'input':
        return <InputPhase onSubmit={handleSubmission} />;
      case 'feedback':
        return <FeedbackPhase isCorrect={isCorrect} correctSequence={sequence} />;
      default:
        return <MainMenu onStartGame={handleStartGame} highScore={highScore} />;
    }
  };

  return (
    <div className="App">
      <h2>High Score: {highScore}</h2>
      <h2>Current Level: {digitLevel}</h2>
      {renderGameState()}
    </div>
  );
}

export default App;