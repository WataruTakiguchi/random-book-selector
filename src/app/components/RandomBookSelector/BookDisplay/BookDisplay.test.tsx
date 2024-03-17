/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookDisplay from "../BookDisplay/BookDisplay";

const mockBookInfo = {
  title: "テストの本",
  author: "テスト 著者",
  publisher: "テスト出版社",
  pubdate: "202302",
};

test("BookDisplay コンポーネントが正しくレンダリングされる", () => {
  // モックの関数を作成
  const mockHandleBuyButton = jest.fn();

  render(
    <BookDisplay
      bookInfo={mockBookInfo}
      handleBuyButton={() => mockHandleBuyButton(mockBookInfo)}
    />
  );

  // コンポーネントが正しく表示されているかをテスト
  expect(screen.getByText("以下の本が選ばれました！")).toBeInTheDocument();
  expect(screen.getByText("テストの本")).toBeInTheDocument();
  expect(
    screen.getByText("テスト 著者, テスト出版社, 2023/02")
  ).toBeInTheDocument();

  // ボタンをクリックしてモック関数が呼ばれるかをテスト
  fireEvent.click(screen.getByText("この本を購入"));
  expect(mockHandleBuyButton).toHaveBeenCalled();
});
