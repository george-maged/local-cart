import React, { Component } from 'react';
import './App.css';
import Product from './Components/Product'
import Cart from './Components/Cart'
import CartEmitter from "./cart";
import CartHeader from './Components/CartHeader'
let cartEmitter = new CartEmitter();
class App extends Component {
  constructor(){
    super();
    this.handleCartClick = this.handleCartClick.bind(this)
    this.state={
      products:[],
      open:false
    }
  }
  componentDidMount(){
    fetch("https://faker-api-yczfsfkfcd.now.sh/api/products")
    .then((response)=>{return response.json()})
    .then((response)=>{
      this.setState({products:response.data})
    })
    .catch((error)=>{
      console.log(error)
    })
    cartEmitter.subscribe("cart.changed",(newCart)=>{
      this.setState({
        open:true
      })
    })
  }
  handleCartClick(){
    this.setState({open:!this.state.open})
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <span className="header__left">
            SHOP
          </span>
          <CartHeader
            cartEmitter = {cartEmitter}
          />
        </div>
        <div className="content">
        {this.state.open?(
            <Cart
              // cart={this.state.cart}
              cartEmitter={cartEmitter}
              handleClearClick={this.handleClearClick}
            />
          ):('')}   
          <div style={{width:(this.state.open?("75%"):("100%"))}}className="content__inner">
            {this.state.products.map((product,index)=>(
              <Product 
              onClick={()=>cartEmitter.addProduct(product)}
              // onClick={()=>this.handleProductClick(product)} 
              productClass = {this.state.open?("open"):("closed")}
              style={{width:(this.state.open?("33.3333%"):("25%"))}} 
              key={index} 
              product={product}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
