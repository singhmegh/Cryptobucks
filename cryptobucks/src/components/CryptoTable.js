import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMarketData } from '../api';

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('usd');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const data = await fetchMarketData(currency);
      console.log('Fetched Coins:', data);
      setCoins(data);
    }
    loadData();
  }, [currency]);

  const handleRowClick = (id) => {
    navigate(`/coins/${id}`);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currencySymbols = {
    usd: '$',
    inr: '₹',
    eur: '€'
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Top Cryptocurrencies</h2>

      {/* Search & Currency Selection */}
      <div className="row mb-3">
        <div className="col-md-8 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or symbol"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
          </select>
        </div>
      </div>

      {/* Coin Table */}
      <div className="table-responsive">
        <table className="table table-hover table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>24hrs Change</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr
                key={coin.id}
                onClick={() => handleRowClick(coin.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <img src={coin.image} alt={coin.name} width={30} />
                </td>
                <td>{coin.name}</td>
                <td>{currencySymbols[currency]}{coin.current_price.toLocaleString()}</td>
                <td>{currencySymbols[currency]}{coin.market_cap.toLocaleString()}</td>
                <td className={coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>
                  <span className={`badge ${coin.price_change_percentage_24h > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {coin.price_change_percentage_24h > 0 ? 'Top Gainer' : 'Top Loser'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCoins.length === 0 && (
        <p className="text-center mt-3">No matching coins found.</p>
      )}
    </div>
  );
};

export default CryptoTable;