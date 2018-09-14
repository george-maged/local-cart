import React, { Component } from 'react';
import './styles/Cart.css'
class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      length: this.calculateLength(this.props.cartEmitter.getCart())
    }
    this.props.cartEmitter.subscribe("cart.changed", (newCart) => {
      this.setState({
        length: this.calculateLength(this.props.cartEmitter.getCart())
      })
    })
  }
  calculateLength(cart){
    let length = 0;
    for(let i = 0 ; i < cart.length;i++){
      length+= cart[i].count
    }
    return length;
  }
  render() {
    return (
      <span className="header__right">
        <img alt="cart" onClick={this.handleCartClick} src={require("../img/cart.png")} />
        <span>{this.state.length}</span>
      </span>
    );
  }
}

export default Cart;
