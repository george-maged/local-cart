import React, { Component } from 'react';
import './styles/CartItem.css'
class Item extends Component {
  render() {
    const product = this.props.product
    return (
        <div className="cart__item">
          <div className="cart__item-image">
            <img src={product.image} alt="Product"/>
          </div>
          <div className="cart__item-content">
            <div className="cart__item-top">
              <p>
                {product.title}              
              </p>
            </div>
            <div className="cart__item-bottom">
              <p>
                {product.price}
              </p>
              <div className="cart__item-selector">
                <button onClick={()=>{this.props.handleCountClick(this.props.index,-1)}}>-</button>  
                <p className="cart__item-count">{this.props.count}</p>
                <button onClick={()=>{this.props.handleCountClick(this.props.index,1)}}>+</button>  
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Item;
