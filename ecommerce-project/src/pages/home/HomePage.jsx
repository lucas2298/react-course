import "./HomePage.css";
import "../header.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cartItems }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setProducts(response.data));
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cartItems={cartItems} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
