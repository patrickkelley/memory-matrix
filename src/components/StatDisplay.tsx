import React from 'react';

interface StatDisplayProps {
  label: string;
  value: number | string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value }) => {
  return (
    <h2>
      {label}: {value}
    </h2>
  );
};

export default StatDisplay;
