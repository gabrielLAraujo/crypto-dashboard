export interface SparklineData {
  price: number[];
}

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;  
  market_cap: number;
  sparkline_in_7d?: {
    price: number[];
  };
}
