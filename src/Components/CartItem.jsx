import React, { Component } from 'react';
import './styles/Product.css';

class Item extends Component {
  render() {
    return (
        <div className="cart__item">
        {this.props.product.title+" ("+this.props.count+")"}
      </div>
    );
  }
}

export default Item;
