/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingMessage from "../LoadingMessage/LoadingMessage";

test("LoadingMessageコンポーネントが正常にレンダリングされ、テキストが表示されることを確認する", () => {
  render(<LoadingMessage />);

  // テキストが表示されていることを確認する
  const textElement = screen.getByText("本を探しています...");
  expect(textElement).toBeInTheDocument();

  // フォントのスタイルが正しいことを確認する
  expect(textElement).toHaveStyle("font-weight: bold");
  expect(textElement).toHaveStyle("font-size: 20px");

  // アイコンが表示されていることを確認する
  const iconElement = screen.getByRole("img", { name: "glass" });
  expect(iconElement).toBeInTheDocument();
});
