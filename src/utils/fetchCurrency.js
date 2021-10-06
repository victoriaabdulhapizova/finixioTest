import axios from "axios";

export const fetchCryptocurrencies = async (currency) => {
  const response = await axios.get(
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,ADA,BNB,USDT,NFT,XRP,DOT,USDC&tsyms=${currency}`
  );
  return response.data;
};