/**
 * @jest-environment jsdom
 */
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchButton from "../SearchButton/SearchButton";

describe("SearchButtonコンポーネントのテスト", () => {
  test("SearchButtonコンポーネントが正常にレンダリングされ、クリックイベントが発火すること確認する", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <SearchButton onClick={handleClick} disabled={false} />
    );

    // ボタンが正常にレンダリングされていることを確認する
    const buttonElement = getByText("新しい本に出会う");
    expect(buttonElement).toBeInTheDocument();

    // クリックイベントが正しく動作することを確認する
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("SearchButtonコンポーネントが正常にレンダリングされ、disabledプロパティが正しく動作することを確認する", () => {
    const handleClick = jest.fn();

    // disabledプロパティが正しく動作することを確認する
    const disabledButton = render(
      <SearchButton onClick={handleClick} disabled={true} />
    );
    const disabledButtonElement = disabledButton.getByText("新しい本に出会う");
    expect(disabledButtonElement).toBeDisabled();
  });
});
