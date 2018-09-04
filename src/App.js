import React, { Component } from 'react';
import './App.css';
import Product from './Components/Product'
import CartItem from './Components/CartItem'
class App extends Component {
  constructor(){
    super();
    this.handleProductClick = this.handleProductClick.bind(this)
    this.handleCartClick = this.handleCartClick.bind(this)
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
    this.setState({
      cart: [...this.state.cart, product],
      open: true
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
          <span className="header__right">
            <img alt="cart" onClick={this.handleCartClick} src={require("./img/cart.png")}/>
          </span>
        </div>
        <div className="content">
        {this.state.open?(
            
            <div className="cart">
              {
                this.state.cart.length===0?(
                  'Your Cart is Empty'
                ) :(
                  this.state.cart.map((product)=>(
                    <CartItem product={product} />
                  ))
                )
              }
            </div>
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
