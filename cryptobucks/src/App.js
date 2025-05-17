import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import CoinDetails from './Pages/CoinDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container py-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
      </Routes>
    </div>
  );
}

export default App;