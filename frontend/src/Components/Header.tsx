import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-gray-200">
      {/* 🛍️ Лого */}
      <div className="text-xl font-bold text-gray-800">Delivery App</div>

      {/* 📦 Навігація */}

      <nav className="flex items-center gap-6 text-gray-600">
        <Link to="/" className="hover:text-black transition">
          Магазин
        </Link>

        <Link to="/history" className="hover:text-black transition">
          History
        </Link>

        <Link to="/coupons" className="hover:text-black transition">
          Coupons
        </Link>
      </nav>

      {/* 🛒 Кошик */}
      <div className="flex items-center gap-3">
        <Link
          to="/cart"
          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          🛒 Cart
        </Link>
      </div>
    </header>
  );
};

export default Header;
