import React, { useState } from 'react';

interface InputPhaseProps {
  onSubmit: (inputValue: string) => void;
}

const keypadButtonStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  margin: '5px',
  fontSize: '1.5em',
};

const keypadContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '5px',
  marginTop: '20px',
};


const InputPhase: React.FC<InputPhaseProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeypadClick = (value: string) => {
    setInputValue(inputValue + value);
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
  };

  return (
    <div>
      <p>Recall the sequence:</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        readOnly
      />
      <div style={keypadContainerStyle}>
        {[...Array(9).keys()].map((i) => (
          <button key={i + 1} style={keypadButtonStyle} onClick={() => handleKeypadClick((i + 1).toString())}>
            {i + 1}
          </button>
        ))}
         <button style={keypadButtonStyle} onClick={handleClear}>
          C
        </button>
        <button style={keypadButtonStyle} onClick={() => handleKeypadClick('0')}>
          0
        </button>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default InputPhase;
