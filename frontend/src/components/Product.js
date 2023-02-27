import "../styles/Product.css";
import { Link } from "react-router-dom";

export default function Product({ image, name, description, price, id }) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <div className="product_info">
        <p className="info_name">{name}</p>
        <p className="info_description">{description}</p>
        <p className="info_price">$ {price}</p>
        <Link to={`/product/${id}`} className="info_button">
          View
        </Link>
      </div>
    </div>
  );
}
