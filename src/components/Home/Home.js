import { Component } from "react";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";
import { BsSearch } from "react-icons/bs";
import FoodHeader from "../FoodHeader";
import Header from "../Header/Header";
import FoodItemCard from "../FoodItemCard";
import "../Home/Home.css";

const foodCategory = [
  {
    name: "All",
    categoryId: "1",
  },
  {
    name: "Appetizer",
    categoryId: "2",
  },
  {
    name: "Dessert",
    categoryId: "3",
  },
  {
    name: "Side Dish",
    categoryId: "4",
  },
  {
    name: "Main Course",
    categoryId: "5",
  },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Home extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeCategory: "All",
    searchInput: "",
    cartLength: "",
  };

  componentDidMount() {
    this.getFoodItems();
    this.getCartList();
  }

  changeFoodCategory = (activeCategory) => {
    this.setState({ activeCategory }, this.getProducts);
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
      this.setState({ cartLength: fetchedData.length });
    }
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  getFoodItems = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "http://localhost:5001/foods";
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
        category: product.category,
        calories: product.calories,
        createdAt: product.create_at,
        description: product.description,
        price: product.price,
        id: product.food_id,
        imageUrl: product.image_url,
        updatedAt: product.updated_at,
      }));
      console.log(updatedData);
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  renderProductsListView = () => {
    const { productsList, activeCategory, searchInput, cartLength } =
      this.state;
    const categoryFilter = productsList.filter((each) => {
      if (each.category === activeCategory || activeCategory === "All") {
        return each;
      }
      return null;
    });
    const searchFilter = categoryFilter.filter((each) => {
      if (
        each.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
      ) {
        return each;
      }
      return null;
    });
    const shouldShowProductsList = searchFilter.length > 0;

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <Header cartLength={cartLength} />
        <div className="search-input-container">
          <input
            value={searchInput}
            type="search"
            className="search-input"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
          />
          <BsSearch className="search-icon" />
        </div>
        <FoodHeader
          activeCategory={activeCategory}
          foodCategory={foodCategory}
          changeFoodCategory={this.changeFoodCategory}
        />
        <ul className="products-list">
          {searchFilter.map((product) => (
            <FoodItemCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products.
        </p>
      </div>
    );
  };

  renderAllProducts = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="all-products-section">{this.renderAllProducts()}</div>
    );
  }
}

export default Home;
