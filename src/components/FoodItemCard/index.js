import { Link } from "react-router-dom";

import "./index.css";

const FoodItemCard = (props) => {
  const { productData } = props;
  const { name, category, imageUrl, price, id } = productData;

  return (
    <li className="product-item">
      <Link to={`/dish/${id}`} className="link-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title">{name}</h1>
        <p className="brand">by {category}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
        </div>
      </Link>
    </li>
  );
};
export default FoodItemCard;
