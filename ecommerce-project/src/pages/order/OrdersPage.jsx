import { Header } from "../../components/Header";
import "../header.css";
import "./OrdersPage.css";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { OrdersDetailGrid } from "./OrderDetailsGrid";
import { OrderHeader } from "./OrderHeader";

export function OrdersPage({ cartItems }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      var response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    getOrders();
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cartItems={cartItems} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.length > 0 &&
            orders.map((order) => {
              return (
                <div className="order-container" key={order.id}>
                  <OrderHeader order={order} />

                  <OrdersDetailGrid order={order} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
