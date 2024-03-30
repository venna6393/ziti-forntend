import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

import "./index.css";

const CartItem = (props) => {
  const { cartItemDetails, increase, decrease, remove } = props;
  const { id, name, quantity, price, imageUrl } = cartItemDetails;
  const onRemoveCartItem = async () => {
    remove(id);
  };
  const inc = async () => {
    increase(id);
  };
  const dec = async () => {
    decrease(id);
  };

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={imageUrl} alt={name} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{name}</p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            onClick={dec}
            className="quantity-controller-button"
            data-testid="minus"
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            onClick={inc}
            className="quantity-controller-button"
            data-testid="plus"
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {price * quantity}/-</p>
          <button
            className="remove-button"
            type="button"
            onClick={onRemoveCartItem}
            data-testid="remove"
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onRemoveCartItem}
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  );
};

export default CartItem;
