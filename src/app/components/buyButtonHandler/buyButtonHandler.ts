export const handleBuyButton = (bookInfo: any) => {
  const hanmotoLink = `https://www.hanmoto.com/bd/isbn/${bookInfo.isbn}`;
  window.open(hanmotoLink);
};
