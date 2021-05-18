import React from 'react';
import './shop-header.css';
import { Link } from 'react-router-dom';

const ShopHeader = () => {
  return (
    <header className="shop-header row">
      <Link to="/">Главная</Link>
      <Link to="/add-product">
        Добавить товар
      </Link>
    </header>
  );
};

export default ShopHeader;
