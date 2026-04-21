import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { Routes, Route } from "react-router";
import { OrdersPage } from "./pages/order/OrdersPage";
import { TrackingPage } from "./pages/tracking/TrackingPage";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    axios
      .get("/api/cart-items?expand=product")
      .then((response) => setCartItems(response.data));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cartItems={cartItems} />} />
      <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
      <Route path="/orders" element={<OrdersPage cartItems={cartItems} />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
