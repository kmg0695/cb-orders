import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { getProducts as listProducts } from "../redux/actions/productActions";
import "../styles/HomeScreen.css";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <h2 className="title">Latest Products</h2>

      <div className="products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              id={product._id}
              image={product.image}
              price={product.price.$numberDecimal}
              description={product.description}
            />
          ))
        )}
      </div>
    </div>
  );
}
