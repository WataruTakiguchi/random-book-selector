import { useState } from "react";
import { fetchBookInfo } from "../bookInfoFetcher/bookInfoFetcher";
import { handleBuyButton } from "../buyButtonHandler/buyButtonHandler";
import Title from "./Title/Title";
import LoadingMessage from "./LoadingMessage/LoadingMessage";
import BookDisplay from "./BookDisplay/BookDisplay";
import SearchButton from "./SearchButton/SearchButton";

function RandomBookSelector() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookInfo, setBookInfo] = useState<any>(null);

  const handleFetchBookInfo = async () => {
    setIsLoading(true);
    const info = await fetchBookInfo();
    setBookInfo(info);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title />
      {isLoading && <LoadingMessage />}
      {!isLoading && bookInfo && (
        <BookDisplay
          bookInfo={bookInfo}
          handleBuyButton={() => handleBuyButton(bookInfo)}
        />
      )}
      {!isLoading && (
        <SearchButton onClick={handleFetchBookInfo} disabled={isLoading} />
      )}
    </div>
  );
}

export default RandomBookSelector;
