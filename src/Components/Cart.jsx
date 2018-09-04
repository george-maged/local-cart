import React, { Component } from 'react';
import './styles/Product.css';
import CartItem from './CartItem'

class Cart extends Component {
  render() {
    return (
        <div className="cart">
            <h1>ITEMS</h1>
            <button onClick={this.props.handleClearClick}>CLEAR</button>
              {
                this.props.cart.length===0?(
                  'Your Cart is Empty'
                ) :(
                  this.props.cart.map((cartObject,index)=>(
                    <CartItem 
                    key={index}
                    {...this.props}
                    count={cartObject.count} 
                    product={cartObject.product} 
                    />
                  ))
                )
              }
        </div>
    );
  }
}

export default Cart;
