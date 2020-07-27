import React from 'react';
import App from "../App";
import ReactDOM from "react-dom";

test('One plus minus one', () => {
  expect(1+(-1)).toBe(0);
});

test('One plus two', () => {
  expect(1+2).toBe(3);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App></App>, div);
})