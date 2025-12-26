import { useEffect, useReducer } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import MemorizationPhase from './components/MemorizationPhase';
import InputPhase from './components/InputPhase';
import FeedbackPhase from './components/FeedbackPhase';
import { generateSequence, validateInput, calculateNewLevel } from './lib/gameLogic';

import StatDisplay from './components/StatDisplay';

// Define the different states of the game
type GameState = 'main_menu' | 'memorization' | 'transition' | 'input' | 'feedback';

const HIGH_SCORE_KEY = 'memoryMatrixHighScore';

type State = {
  gameState: GameState;
  digitLevel: number;
  highScore: number;
  sequence: string;
  isCorrect: boolean;
};

type Action =
  | { type: 'LOAD_HIGH_SCORE'; payload: number }
  | { type: 'START_GAME' }
  | { type: 'SET_GAME_STATE'; payload: GameState }
  | { type: 'SET_SEQUENCE'; payload: string }
  | { type: 'SUBMIT_RESULT'; payload: { wasCorrect: boolean } };

const initialState: State = {
  gameState: 'main_menu',
  digitLevel: 1,
  highScore: 1,
  sequence: '',
  isCorrect: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_HIGH_SCORE':
      return { ...state, highScore: action.payload };
    case 'START_GAME':
      return { ...state, digitLevel: 1, gameState: 'memorization', isCorrect: false };
    case 'SET_GAME_STATE':
      return { ...state, gameState: action.payload };
    case 'SET_SEQUENCE':
      return { ...state, sequence: action.payload };
    case 'SUBMIT_RESULT': {
      const newLevel = calculateNewLevel(state.digitLevel, action.payload.wasCorrect);
      const newHighScore = Math.max(state.highScore, newLevel);
      return {
        ...state,
        digitLevel: newLevel,
        isCorrect: action.payload.wasCorrect,
        highScore: newHighScore,
        gameState: 'feedback',
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load high score from local storage on initial render
  useEffect(() => {
    const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (savedHighScore) {
      dispatch({ type: 'LOAD_HIGH_SCORE', payload: parseInt(savedHighScore, 10) });
    }
  }, []);

  // Sync high score to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(HIGH_SCORE_KEY, state.highScore.toString());
  }, [state.highScore]);

  // Effect for handling game state logic and timers
  useEffect(() => {
    if (state.gameState === 'memorization') {
      dispatch({ type: 'SET_SEQUENCE', payload: generateSequence(state.digitLevel) });
      const memorizationTime = 1500 + 500 * state.digitLevel;
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_GAME_STATE', payload: 'transition' });
      }, memorizationTime);
      return () => clearTimeout(timer);
    }

    if (state.gameState === 'feedback') {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_GAME_STATE', payload: 'memorization' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.gameState, state.digitLevel]);

  const handleStartGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  const handleSubmission = (inputValue: string) => {
    const correct = validateInput(inputValue, state.sequence);
    dispatch({ type: 'SUBMIT_RESULT', payload: { wasCorrect: correct } });
  };

  // Render different components based on the game state
  const renderGameState = () => {
    switch (state.gameState) {
      case 'main_menu':
        return <MainMenu onStartGame={handleStartGame} highScore={state.highScore} />;
      case 'memorization':
        return <MemorizationPhase sequence={state.sequence} />;
      case 'transition':
        return <button onClick={() => dispatch({ type: 'SET_GAME_STATE', payload: 'input' })}>Next</button>;
      case 'input':
        return <InputPhase onSubmit={handleSubmission} />;
      case 'feedback':
        return <FeedbackPhase isCorrect={state.isCorrect} correctSequence={state.sequence} />;
      default:
        return <MainMenu onStartGame={handleStartGame} highScore={state.highScore} />;
    }
  };

  return (
    <div className="App">
      <StatDisplay label="High Score" value={state.highScore} />
      <StatDisplay label="Current Level" value={state.digitLevel} />
      {renderGameState()}
    </div>
  );
}

export default App;