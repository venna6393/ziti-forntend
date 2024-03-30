import { Component } from "react";
import Popup from "reactjs-popup";

class CartSummary extends Component {
  state = { message: false, value: "" };

  change1 = (event) => {
    this.setState({ value: event.target.value });
  };
  clicked1 = () => {
    this.setState({ message: true });
  };
  render() {
    const { cartList, order } = this.props;
    const { message } = this.state;
    if (message === true) {
      order();
    }
    let sum1 = 0;
    cartList.forEach((element) => {
      sum1 += element.price * element.quantity;
    });
    console.log(sum1);
    return (
      <div>
        <h1>Order Total: Rs{sum1}</h1>
        <p>{cartList.length} Items in cart</p>
        <Popup
          trigger={(open) => (
            <button type="button" className="button">
              {" "}
              {open ? "Close" : "Checkout"}
            </button>
          )}
          position="right center"
          closeOnDocumentClick
        >
          <div className="payment">
            <input type="radio" id="r1" name="payment" disabled />
            <label htmlFor="r1">Net Banking</label>
            <input
              type="radio"
              onChange={this.change1}
              id="r2"
              name="payment"
            />
            <label htmlFor="r2">Cash on Delivery</label>
            <div>
              <h1>Order Total: Rs{sum1}</h1>
              <p>{cartList.length} Items in cart</p>
            </div>
            <button type="button" onClick={this.clicked1}>
              Confirm Order
            </button>
            {message && <p>Your order has been placed successfully</p>}
          </div>
        </Popup>
      </div>
    );
  }
}

export default CartSummary;
