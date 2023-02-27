import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductScreen.css";

import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

export default function ProductScreen() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.getProductDetails);

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    navigate("/cart");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="productscreen">
      <>
        <div className="left">
          <div className="left_image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="left_info">
            <p className="left_name">{product.name}</p>
            <p>{product.description}</p>
          </div>
          <div className="right">
            <div className="right_info">
              <p>
                Price:{" "}
                <span>
                  $ {product && product.price && product.price.$numberDecimal}
                </span>
              </p>
              <p>
                Status:{" "}
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p>
                Quantity
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
