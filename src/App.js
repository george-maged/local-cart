import React, { Component } from 'react';
import './App.css';
import Product from './Components/Product'
import Cart from './Components/Cart'
class App extends Component {
  constructor(){
    super();
    this.handleProductClick = this.handleProductClick.bind(this)
    this.handleCartClick = this.handleCartClick.bind(this)
    this.handleClearClick = this.handleClearClick.bind(this)
    this.handleCountClick = this.handleCountClick.bind(this)
    this.state={
      products:[],
      cart:[],
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
  }
  handleProductClick(product){
    let cart = this.state.cart.slice(0);
    for(let i = 0 ; i < cart.length;i++){
      if(cart[i].product.title === product.title){
        cart[i].count++;
        this.setState({
          cart:cart,
          open:true
        })
        return;
      }
    }
    let productObject = {
      product:product,
      count:1
    }
    cart.push(productObject)
    this.setState({
      cart: cart,
      open: true
    })
  }
  handleCountClick(index,value){
    let cart = this.state.cart.slice(0);
    cart[index].count += value;
    if(cart[index].count <1){
      cart.splice(index,1)
    }
    this.setState({
      cart:cart
    })
  }
  handleCartClick(){
    this.setState({open:!this.state.open})
  }
  handleClearClick(){
    this.setState({
      cart:[]
    })
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <span className="header__left">
            SHOP
          </span>
          <span className="header__right">
            <img alt="cart" onClick={this.handleCartClick} src={require("./img/cart.png")}/>
          </span>
        </div>
        <div className="content">
        {this.state.open?(
            <Cart
              cart={this.state.cart}
              handleClearClick={this.handleClearClick}
              handleCountClick={this.handleCountClick}
            />
          ):('')}   
          <div style={{width:(this.state.open?("75%"):("100%"))}}className="content__inner">
            {this.state.products.map((product,index)=>(
              <Product 
              onClick={()=>this.handleProductClick(product)} 
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
