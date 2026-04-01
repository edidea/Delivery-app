import { Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";
import CouponsPage from "./pages/CouponsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/coupons" element={<CouponsPage />} />
      </Routes>
    </div>
  );
}

export default App;
