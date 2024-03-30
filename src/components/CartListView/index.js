import { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import CartItem from "../CartItem";
import CartSummary from "../CartSummary";
import "./index.css";

class CartListView extends Component {
  state = { cartLength: "", cartList: [] };

  componentDidMount() {
    this.getCartList();
  }

  remove = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:5001/cart/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      this.getCartList();
      console.log(fetchedData);
    } else {
      console.log("failed deletion");
    }
  };
  increase = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:5001/cart/${id}/increase`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      this.getCartList();
      console.log(fetchedData);
    } else {
      console.log("failed increase");
    }
  };
  decrease = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:5001/cart/${id}/decrease`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      this.getCartList();
      console.log(fetchedData);
    } else {
      console.log("failed decrease");
    }
  };
  order = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const { history } = this.props;
    const apiUrl = `http://localhost:5001/orders`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      this.getCartList();
      history.replace("/");
    } else {
      console.log("failed increase");
    }
  };

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
    const { cartList, cartLength } = this.state;
    return (
      <div>
        <ul className="cart-list">
          {cartList.map((eachCartItem) => (
            <CartItem
              key={eachCartItem.id}
              cartItemDetails={eachCartItem}
              remove={this.remove}
              increase={this.increase}
              decrease={this.decrease}
            />
          ))}
        </ul>
        {cartLength > 0 && (
          <CartSummary cartList={cartList} order={this.order} />
        )}
      </div>
    );
  }
}

export default withRouter(CartListView);
