/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "../Title/Title";

test("Titleコンポーネントが正常にレンダリングされていることを確認する", () => {
  const { getByText } = render(<Title />);
  const titleElement = getByText("Random Book Selector");
  expect(titleElement).toBeInTheDocument();
});
