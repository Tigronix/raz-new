import React from 'react';
import './shop-header.css';
import { Link } from 'react-router-dom';

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className="shop-header row">
      <Link to="/add-product">
        Добавить товар
      </Link>
    </header>
  );
};

export default ShopHeader;
