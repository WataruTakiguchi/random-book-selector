/**
 * @jest-environment jsdom
 */
import { handleBuyButton } from "../buyButtonHandler/buyButtonHandler";

describe("関数handleBuyButtonのテスト", () => {
  test("正しいURLで新しいウィンドウを開く", () => {
    const mockWindowOpen = jest.fn(); // window.open 関数をモックする
    window.open = mockWindowOpen;

    const bookInfo = { isbn: "1234567890" };
    handleBuyButton(bookInfo);

    expect(mockWindowOpen).toHaveBeenCalledTimes(1); // window.open が1回呼ばれたことを確認
    expect(mockWindowOpen).toHaveBeenCalledWith(
      `https://www.hanmoto.com/bd/isbn/${bookInfo.isbn}`
    ); // window.open が正しいURLで呼ばれたことを確認
  });
});
