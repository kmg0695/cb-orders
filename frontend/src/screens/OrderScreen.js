import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.post(
          "http://localhost:5151/api/clients/login",
          {
            email: "jdoe@test.org",
            password: "123456",
          }
        );
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  console.log(user);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {user && (
        <div>
          {user.client.orders.map((order) => (
            <div key={order.orderID}>
              <p>Order ID: {order.orderID}</p>
              <p>Order Date: {order.orderDate}</p>
              <p>Order Total: {order.orderTotal.$numberDecimal}</p>
              <p>Order Status:</p>
              <ul>
                {order.orderStatus.map((status) => (
                  <li key={status._id}>
                    <p>Received: {status.received ? "True" : "False"}</p>
                    <p>Processing: {status.processing ? "True" : "False"}</p>
                    <p>Shipped: {status.shipped ? "True" : "False"}</p>
                    <p>Delivered: {status.delivered ? "True" : "False"}</p>
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
