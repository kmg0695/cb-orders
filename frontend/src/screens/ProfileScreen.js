import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileScreen() {
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

  return (
    <div>
      {loading && <p>Loading...</p>}
      {user && (
        <div>
          <p>Name: {user.client.name}</p>
          <p>Email: {user.client.email}</p>
          <p>Phone: {user.client.phone}</p>
          <p>
            Address: {user.client.address.street}, {user.client.address.city},{" "}
            {user.client.address.state} {user.client.address.postalCode}
          </p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
