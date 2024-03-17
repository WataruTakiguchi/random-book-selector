import { generateRandomISBN } from "../isbnGenerator/isbnGenerator";

describe("関数generateRandomISBNのテスト", () => {
  it("正しい形式のISBNを生成する", () => {
    const isbn = generateRandomISBN();

    // ISBNの形式を正規表現でチェック
    const regex = /^(978|979)4\d{9}$/;
    expect(isbn).toMatch(regex);
  });
});
