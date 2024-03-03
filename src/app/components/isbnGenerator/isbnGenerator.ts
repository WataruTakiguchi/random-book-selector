export const generateRandomISBN = () => {
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
