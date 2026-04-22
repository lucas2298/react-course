import "./HomePage.css";
import "../header.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cartItems, loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };

    getHomeData();
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cartItems={cartItems} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>

      <VerySlowComponent />
    </>
  );
}

export const VerySlowComponent = () => {
  useEffect(() => {
    console.log("Very slow component rendered");
  });
  return <div>Very slow component</div>;
};
