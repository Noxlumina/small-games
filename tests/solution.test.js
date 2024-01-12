import { render } from "@testing-library/preact";
import { h } from 'preact';

import Solution from "../src/components/solution";

describe("Solution", () => {
  test("should display the desired sentence", () => {
    const { container } = render(<Solution type="example" solution="42" />);
    expect(container.textContent).toMatch('The generated random example was: 42');
  });
});
