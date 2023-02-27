import "../styles/CartScreen.css";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";

export default function CartScreen() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = cartItems.reduce(
    (qty, item) => Number(item.qty) + qty,
    0
  );

  const getCartSubTotal = cartItems
    .reduce(
      (price, item) =>
        price +
        item.qty * item.price.$numberDecimal +
        25 +
        (item.qty * item.price.$numberDecimal + 25) * 0.13,
      0
    )
    .toFixed(2);

  return (
    <div className="cartscreen">
      <div className="cartscreen_left">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.product}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeHandler}
            />
          ))
        )}
      </div>
      <div className="cartscreen_right">
        <div className="cartscreen_info">
          <p>You have {getCartCount} items on your cart.</p>
          <p>$ {getCartSubTotal}</p>
          <p>The subtotal includes the following:</p>
          <ul>
            <li>Shipping & Handling: $ 25</li>
            <li>Estimated Tax: 13% HST</li>
          </ul>
        </div>
        <div>
          <button>Order</button>
        </div>
      </div>
    </div>
  );
}
