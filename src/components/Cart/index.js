import { Component } from "react";
import Cookies from "js-cookie";
import Header from "../Header/Header";
import CartListView from "../CartListView";
import EmptyCartView from "../EmptyCartView";

import "./index.css";

class Cart extends Component {
  state = { cartLength: "", cartList: [] };

  componentDidMount() {
    this.getCartList();
  }

  getCartList = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "http://localhost:5001/cart";
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        id: product.food_id,
        imageUrl: product.image_url,
      }));
      this.setState({ cartLength: fetchedData.length, cartList: updatedData });
    }
  };

  render() {
    const { cartLength, cartList } = this.state;
    return (
      <>
        <Header cartLength={cartLength} />
        <div className="cart-container">
          {cartLength === 0 ? (
            <EmptyCartView />
          ) : (
            <div className="cart-content-container">
              <h1 className="cart-heading">My Cart</h1>
              <CartListView />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Cart;
