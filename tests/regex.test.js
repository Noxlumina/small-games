import { h } from 'preact';
import { containsSpecialCharacters,returnMaskedWord } from '../src/services/regex';

describe("containsSpecialCharacters", () => {
  test("should return true if the input contains special characters", () => {
    const input = "abc@123";
    expect(containsSpecialCharacters(input)).toBe(true);
  });

  test("should return false if the input contains only alphabetical characters", () => {
    const input = "abcXYZ";
    expect(containsSpecialCharacters(input)).toBe(false);
  });
});

describe("returnMaskedWord", () => {
  test("should return masked word with matching letters revealed", () => {
    const word = "apple";
    const input = "apxle";
    const expectedOutput = "AP?LE";

    expect(returnMaskedWord(word, input)).toBe(expectedOutput);
  });

  test("should replace non-matching letters with '?'", () => {
    const word = "banana";
    const input = "grape";
    const expectedOutput = "??????";

    expect(returnMaskedWord(word, input)).toBe(expectedOutput);
  });

  test("should handle case sensitivity", () => {
    const word = "Pineapple";
    const input = "PiNeApPlE";
    const expectedOutput = "PINEAPPLE";

    expect(returnMaskedWord(word, input)).toBe(expectedOutput);
  });
});
