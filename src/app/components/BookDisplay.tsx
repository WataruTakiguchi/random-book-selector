interface BookDisplayProps {
  bookInfo: {
    title: string;
    author: string;
    publisher: string;
    pubdate: string;
  };
  handleBuyButton: () => void;
}

const BookDisplay: React.FC<BookDisplayProps> = ({
  bookInfo,
  handleBuyButton,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl mb-3">以下の本が選ばれました！</h2>
      <p style={{ fontWeight: "bold", fontSize: "20px" }}>{bookInfo.title}</p>
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
  );
};

export default BookDisplay;
