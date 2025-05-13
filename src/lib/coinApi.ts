import axios from "axios";

const COIN_API_URL = 'https://api.coingecko.com/api/v3/coins';
const COIN_API_KEY = process.env.NEXT_PUBLIC_COINAPI_KEY;
console.log(COIN_API_KEY);
export const getAssets = async () => {
    const { data } = await axios.get(`${COIN_API_URL}/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 20,
          page: 1,
          sparkline: false,
        },
      });
  return data;
};
export const getAssetById = async (id: string) => {
    console.log(id);
    const { data } = await axios.get(`${COIN_API_URL}/${id}`, {
        params: {
            vs_currency: 'usd',
        },
    });
    console.log(data);
    return data;
};