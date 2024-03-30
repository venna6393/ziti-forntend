import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Component } from "react";
import CartContext from "./context/CartContext";
import Home from "./components/Home/Home";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound/NotFound";
import Dish from "./components/Dish";

class App extends Component {
  state = {
    cartList: [],
    message: false,
    text: true,
  };

  incrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const updatedList = cartList.map((each) => {
      if (each.dishId === id) {
        return { ...each, quantity: each.quantity + 1 };
      }
      return each;
    });
    this.setState({ cartList: updatedList });
  };

  change1 = () => {
    this.setState((prevState) => ({
      text: !prevState.text,
    }));
  };

  decrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const updatedList = cartList.map((each) => {
      if (each.dishId === id) {
        if (each.quantity > 0) {
          return { ...each, quantity: each.quantity - 1 };
        }
      }
      return each;
    });
    const updatedList1 = updatedList.filter((each) => each.quantity > 0);
    this.setState({ cartList: updatedList1 });
  };

  clicked1 = () => {
    this.setState((prevState) => ({
      message: !prevState.message,
    }));
  };

  removeCartItem = (id) => {
    const { cartList } = this.state;
    const updatedList = cartList.filter((each) => each.dishId !== id);
    this.setState({ cartList: updatedList });
  };

  removeAllCartItems = () => {
    this.setState({ cartList: [] });
  };

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = (product) => {
    const { cartList } = this.state;
    const isThere = cartList.find((each) => {
      if (each.dishId === product.dishId) {
        return each;
      }
      return null;
    });
    if (isThere === undefined) {
      this.setState((prevState) => ({
        cartList: [...prevState.cartList, product],
      }));
    } else {
      const updatedList1 = cartList.map((each) => {
        if (each.dishId === product.dishId) {
          return { ...each, quantity: each.quantity + 1 };
        }
        return each;
      });
      this.setState({ cartList: updatedList1 });
    }
  };

  render() {
    const { cartList, message, text } = this.state;

    return (
      <CartContext.Provider
        value={{
          cartList,
          message,
          text,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          clicked1: this.clicked1,
          change1: this.change1,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={RegisterForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/dish/:id" component={Dish} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    );
  }
}

export default App;
