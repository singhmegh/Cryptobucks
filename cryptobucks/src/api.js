import axios from 'axios';

// Exporting correctly
export const fetchMarketData = async (currency = 'usd') => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    return [];
  }
};

// Also export historical data (if needed)
export const fetchHistoricalData = async (coinId = 'bitcoin', days = 30) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days
      }
    });
    return response.data.prices;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
};