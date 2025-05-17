import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HistoricalChart from '../components/HistoricalChart';

const CoinDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate(-1)} // Go back to previous page
      >
        <i className="bi bi-arrow-left"></i>
        Return to Table
      </button>

      <h4 className="text-center mb-4">{id.toUpperCase()} - Price Chart</h4>

      <HistoricalChart coinId={id} />
    </div>
  );
};

export default CoinDetails;