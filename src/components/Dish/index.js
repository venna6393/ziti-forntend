import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import Header from "../Header/Header";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Dish extends Component {
  state = {
    productData: {},
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
    text: "",
    cartLength: "",
  };

  componentDidMount() {
    this.getProductData();
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
      this.setState({ cartLength: fetchedData.length });
    }
  };

  getFormattedData = (data) => ({
    calories: data.calories,
    name: data.name,
    description: data.description,
    id: data.food_id,
    imageUrl: data.image_url,
    price: data.price,
  });

  getProductData = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:5001/foods/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = this.getFormattedData(fetchedData[0]);
      this.setState({
        productData: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  onClickAddToCart = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const id1 = parseInt(id);
    const { quantity } = this.state;
    const details = { food_id: id1, quantity };
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:5001/cart`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(details),
    };
    console.log(JSON.stringify(details));

    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();

    if (response.ok) {
      console.log(fetchedData);
      this.setState(
        { text: "Item added to cart successfully" },
        this.getCartList
      );
    }
  };

  onDecrementQuantity = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  };

  onIncrementQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  renderProductDetailsView = () => {
    const { productData, quantity, text } = this.state;
    const { name, description, imageUrl, price, calories } = productData;

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{name}</h1>
            <p className="price-details">Rs {price}/-</p>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Calories:</p>
              <p className="value">{calories}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onDecrementQuantity}
                data-testid="minus"
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onIncrementQuantity}
                data-testid="plus"
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={this.onClickAddToCart}
            >
              ADD TO CART
            </button>
            <p>{text}</p>
          </div>
        </div>
      </div>
    );
  };

  renderProductDetails = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    const { cartLength } = this.state;
    return (
      <>
        <Header cartLength={cartLength} />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    );
  }
}
export default Dish;
