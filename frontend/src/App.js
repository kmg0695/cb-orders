import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// screens import
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";

// components
import Navbar from "./components/Navbar";
import OrderScreen from "./screens/OrderScreen";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/product/:id" element={<ProductScreen />} />
          <Route exact path="/cart" element={<CartScreen />} />
          <Route exact path="/profile" element={<ProfileScreen />} />
          <Route exact path="/orders" element={<OrderScreen />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
