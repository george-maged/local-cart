import React, { Component } from 'react';
import CartItem from './CartItem'
import './styles/Cart.css'
class Cart extends Component {

  render() {
    let total = 0    
    let cart = this.props.cart.slice(0)
    for(let i = 0 ; i < cart.length;i++){
      total += cart[i].count * cart[i].product.price 
    }
    return (
        <div className="cart">
          <div className="cart__header">
            <span className="cart__header-left">
              <h1>ITEMS</h1>
            </span>
            <span className="cart__header-right">
              <button onClick={this.props.handleClearClick}>CLEAR</button>
            </span>
          </div>
          <div className="cart__content">
              {
                this.props.cart.length===0?(
                  <p className="cart__content-title">
                  Your Cart is Empty
                  </p>
                ) :(
                  <div className="cart__content-body">
                    {this.props.cart.map((cartObject,index)=>(
                      <CartItem 
                      key={index}
                      index={index}
                      {...this.props}
                      count={cartObject.count} 
                      product={cartObject.product} 
                      />
                    ))}
                    <button className="cart__button" onClick={this.props.handleClearClick}>PAY {total} EGP</button>
                  </div>
                )
              }
          </div>
        </div>
    );
  }
}

export default Cart;
