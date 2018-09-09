import React, { Component } from 'react';
import './styles/Product.css';

class Product extends Component {
  render() {
    return (
      <div className={"product "+this.props.productClass}>
        <img src={this.props.product.image} alt={this.props.product.title}/>
        {/* <img src={"https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image"} alt={this.props.product.title}/> */}
        <div className="product__price">
          {this.props.product.price} EGP
        </div>
        <div className="product__content">
          <span className="product__content-title">
            {this.props.product.title}
          </span>
          <span className="product__content-button">
            <button onClick={this.props.onClick}>ADD +</button>
          </span>
        </div>
      </div>
    );
  }
}

export default Product;