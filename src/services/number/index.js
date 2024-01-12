/**
 * Method for generating a random number between 1 and n
 * @param {*} n max value for the generated number
 * @returns a number between 0 and n
 */
export const getRandomInt = (n) => {
  return Math.floor(Math.random() * n) + 1;
};

/**
 * Method for creating a list ranging from a minimum value to a maximum value with a predefined increment
 * @param {*} start start value 
 * @param {*} end end value
 * @param {*} step increment between two values
 * @returns
 */
export const range = (start, end, step) => {
  step = step || 1;
  return Array.from(
    { length: Math.floor((end - start) / step) + 1 },
    (_, index) => start + index * step
  );
};

 /**
   * Method checking the unicity of the digits in one number.
   * @param {*} input
   * @returns true if unique digit in number
   */
 export const hasUniqueDigits = (input) => {
  const digitSet = new Set();
  for (const digit of input) {
    if (digitSet.has(digit)) {
      return false;
    }
    digitSet.add(digit);
  }
  return true;
};

  /**
   * Method for generating a number with four unique digits
   * @returns
   */
  export const generateSecretNumber = () => {
    let numbers = range(1, 9, 1);
    console.log(numbers);
    const secret = [];
    while (secret.length < 4) {
      let random = getRandomInt(numbers.length);
      secret.push(numbers[random - 1]);
      numbers.splice(random - 1, 1);
    }
    return secret;
  };
