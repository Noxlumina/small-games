/**
 * Checks if the input string contains any special characters.
 * @param {string} input - The input string to be checked.
 * @returns {boolean} - Returns false if the input contains only alphabetical characters (no special characters),
 *  otherwise false.
 */
export const containsSpecialCharacters = (input) => {
  const regex = /^[a-zA-Z]+$/;
  return !regex.test(input);
};

/**
 * Generates a masked word based on the secret word and user input.
 * Replaces matching letters with the actual letter, and non-matching letters with "?".
 * 
 * @param {string} word - The secret word to be masked.
 * @param {string} input - The user input to compare with the secret word.
 * @returns {string} - The masked word with matching letters revealed and non-matching letters replaced with "?".
 */
export const returnMaskedWord = (word, input) => {
    let newMaskedWord = "";
    for (let i = 0; i < word.length; i++) {
        const secretLetter = word[i];
        const userInputLetter = input.toLowerCase()[i];

        // Reveals matching letters or replaces non-matching letters with "?"
        newMaskedWord += secretLetter.toLowerCase() === userInputLetter ? secretLetter : "?";
    }
    return newMaskedWord.toUpperCase();
};

