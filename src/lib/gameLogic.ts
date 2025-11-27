/**
 * Generates a random numeric sequence of a given length.
 * @param length The desired length of the sequence (Digit Level).
 * @returns A string of random digits.
 */
export const generateSequence = (length: number): string => {
  let sequence = '';
  for (let i = 0; i < length; i++) {
    sequence += Math.floor(Math.random() * 10).toString();
  }
  return sequence;
};

/**
 * Validates the user's input against the correct sequence.
 * @param userInput The sequence entered by the user.
 * @param correctSequence The original, correct sequence.
 * @returns True if the input is correct, false otherwise.
 */
export const validateInput = (userInput: string, correctSequence: string): boolean => {
  return userInput === correctSequence;
};

/**
 * Calculates the new Digit Level based on the outcome of the round.
 * @param currentLevel The player's current Digit Level.
 * @param wasCorrect Whether the player's answer was correct.
 * @returns The new Digit Level.
 */
export const calculateNewLevel = (currentLevel: number, wasCorrect: boolean): number => {
  if (wasCorrect) {
    return currentLevel + 1;
  } else {
    return Math.max(1, currentLevel - 1); // Level is floored at 1
  }
};
