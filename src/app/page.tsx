"use client";
import { useState } from "react";
import axios from "axios";

const RandomBookSelector = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookInfo, setBookInfo] = useState<any>(null);

  // 無作為にISBNを生成する処理
  const generateRandomISBN = () => {
    let isbn = "";
    const digits = "0123456789";
    // 最初の3桁は978or979
    const first3Digits = Math.random() < 0.5 ? "978" : "979";
    // 978or979の次は4で固定(日本語の書籍に絞る)
    isbn += first3Digits + "4";

    // 出版社を表す4桁のコードをランダムで生成
    for (let i = 0; i < 4; i++) {
      isbn += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    // 本そのものを表す4桁のコードをランダムで生成
    for (let i = 0; i < 4; i++) {
      isbn += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    /* 最後の1桁はチェックデジット。
    ※チェックデジットとは、バーコードの読み間違いがないかを検査するための数値。
    以下のような手順で作る。
    ・「左から奇数桁の数字の合計」に「偶数桁の数字の合計」を3倍した値を加える
    ・↑の下1桁を特定し、10から引く
    */
    let sum = 0;
    for (let i = 0; i < isbn.length - 1; i++) {
      const digit = parseInt(isbn.charAt(i));
      if (i % 2 === 0) {
        sum += digit;
      } else {
        sum += digit * 3;
      }
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    isbn += checkDigit;

    return isbn;
  };

  /* openBD APIにランダムで生成したISBNを渡して検索することを、
  書籍がヒットするまでやり続ける。
  ※ランダムで生成したISBNに紐づく書籍が必ず実在する保証がないため。
  */
  const fetchBookInfo = async () => {
    setIsLoading(true);
    let isbn;
    do {
      isbn = generateRandomISBN();
      const response = await axios.get(
        `https://api.openbd.jp/v1/get?isbn=${isbn}`
      );
      if (response.data && response.data[0] && response.data[0].summary) {
        setBookInfo(response.data[0].summary);
        setIsLoading(false);
        break;
      }
    } while (true);
  };

  // 版元ドットコムに遷移するためのリンクを生成
  const handleBuyButton = () => {
    const hanmotoLink = `https://www.hanmoto.com/bd/isbn/${bookInfo.isbn}`;
    window.open(hanmotoLink);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Random Book Selector</h1>
      {isLoading && (
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>
          <span role="img" aria-label="glass" className="mr-2">
            🔎
          </span>
          本を探しています...
        </p>
      )}
      {!isLoading && bookInfo && (
        <div className="text-center">
          <h2 className="text-2xl mb-3">以下の本が選ばれました！</h2>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            {bookInfo.title}
          </p>
          <p style={{ color: "grey", fontSize: "16px" }}>
            {bookInfo.author}, {bookInfo.publisher},{" "}
            {bookInfo.pubdate.slice(0, 4) + "/" + bookInfo.pubdate.slice(4)}
          </p>
          <div className="flex justify-center items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 m-5 rounded-md flex items-center"
              onClick={handleBuyButton}
            >
              <span role="img" aria-label="wallet" className="mr-2">
                👛
              </span>
              この本を購入
            </button>
          </div>
        </div>
      )}
      {!isLoading && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center mb-2"
          onClick={fetchBookInfo}
          disabled={isLoading}
        >
          <span role="img" aria-label="book" className="mr-2">
            📓
          </span>
          新しい本に出会う
        </button>
      )}
    </div>
  );
};

export default RandomBookSelector;
