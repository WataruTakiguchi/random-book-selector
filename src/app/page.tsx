"use client";
import { useState } from "react";
import axios from "axios";
import Title from "./components/Title";
import LoadingMessage from "./components/LoadingMessage";
import BookDisplay from "./components/BookDisplay";
import SearchButton from "./components/SearchButton";

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
      <Title />
      {isLoading && <LoadingMessage />}
      {!isLoading && bookInfo && (
        <BookDisplay bookInfo={bookInfo} handleBuyButton={handleBuyButton} />
      )}
      {!isLoading && (
        <SearchButton onClick={fetchBookInfo} disabled={isLoading} />
      )}
    </div>
  );
};

export default RandomBookSelector;
