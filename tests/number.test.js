import {
  getRandomInt,
  range,
  hasUniqueDigits,
  generateSecretNumber,
} from "../src/services/number";

describe("getRandomInt", () => {
  test("should generate a random number between 1 and n", () => {
    const n = 10;
    const randomInt = getRandomInt(n);
    expect(randomInt).toBeGreaterThanOrEqual(1);
    expect(randomInt).toBeLessThanOrEqual(n);
  });
});

describe("range", () => {
  test("should create a list with the specified range and step", () => {
    const start = 1;
    const end = 10;
    const step = 2;
    const result = range(start, end, step);
    const expected = [1, 3, 5, 7, 9];
    expect(result).toEqual(expected);
  });

  test("should create a list with default step if not provided", () => {
    const start = 1;
    const end = 5;
    const result = range(start, end);
    const expected = [1, 2, 3, 4, 5];
    expect(result).toEqual(expected);
  });
});

describe("hasUniqueDigits", () => {
  test("should return true for a string with unique digits", () => {
    const input = "12345";
    const result = hasUniqueDigits(input);
    expect(result).toBe(true);
  });

  test("should return false for a string with repeated digits", () => {
    const input = "112233";
    const result = hasUniqueDigits(input);
    expect(result).toBe(false);
  });

  test("should return true for an empty string", () => {
    const input = "";
    const result = hasUniqueDigits(input);
    expect(result).toBe(true);
  });

  test("should return true for a string with one digit", () => {
    const input = "9";
    const result = hasUniqueDigits(input);
    expect(result).toBe(true);
  });
});

describe("generateSecretNumber", () => {
  test("should generate a number with four unique digits", () => {
    // Mock the getRandomInt function to always return 1 for this test
    jest.spyOn(global.Math, "random").mockReturnValue(0);

    const result = generateSecretNumber();
    const uniqueDigits = new Set(result);

    expect(result.length).toBe(4);
    expect(uniqueDigits.size).toBe(4);

    // Restore the original Math.random function
    global.Math.random.mockRestore();
  });
});
