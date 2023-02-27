import { Link } from "react-router-dom";
import "../styles/CartItem.css";

export default function CartItem({ item, qtyChangeHandler, removeHandler }) {
  return (
    <div className="cartitem">
      <div className="cartitem_image">
        <img src={item.image} alt={item.name} />
      </div>

      <Link to={`/product/${item.product}`} className="cartitem_name">
        <p>{item.name}</p>
      </Link>

      <p className="cartitem_price">{item.price.$numberDecimal}</p>

      <input
        type="number"
        min="1"
        className="cartitem_select"
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
      />

      <button
        className="cartitem_deletebtn"
        onClick={() => removeHandler(item.product)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}
