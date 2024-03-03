import { generateRandomISBN } from "../isbnGenerator/isbnGenerator";
import axios from "axios";

export const fetchBookInfo = async () => {
  let isbn;
  do {
    isbn = generateRandomISBN();
    const response = await axios.get(
      `https://api.openbd.jp/v1/get?isbn=${isbn}`
    );
    if (response.data && response.data[0] && response.data[0].summary) {
      return response.data[0].summary;
    }
  } while (true);
};
