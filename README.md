# Local Cart

Implement **[this deisgn](https://www.figma.com/file/YdHvYic4a8F0Hu7l6YQnDhvr/CartTask?node-id=0%3A1)**

![cart task](./img/cart-task-desktop-view.png)

> If you sign in to figma you can export the assets (like cart icon etc) from the design

## Restrictions

- You may use a framework of your choosing.
- Vanilla JS is better, jQuery is worse.
- Please don't use any extra libraries if you can. (no bootstrap)
- The design should be responsive (as shown in the design link)
- You should use ES6+ Javascript Features, all modern browsers support ES Modules and async/await
- Create a repo for the project and publish it as a [Github page](https://pages.github.com/) or using [now.sh](https://now.sh/)
- Use this backend API `https://faker-api-yczfsfkfcd.now.sh/api/products` endpoint to load the products
    - You may save and load the data locally if it's more suitable
- You must create a cart.js file that manages your cart state **which is futhur explained bellow**

#### cart.js

`cart.js` should contain your app logic and should be designed to work with any framework or pure JS

Your cart.js file contains
- The state of the cart 
- Methods for **adding removing incrementing and decrementing** items
- A way to **get the state** of the car directly
- Implements an EventEmitter exposing a subscribe method that allows you to pass a function that is triggered whenever the cart's state changes
- Implement a cart.test.js file that tests the cart.js

## Extra points

- You are judged on the cleanliness of your code [here's a summary of Clean Code for JS](https://github.com/ryanmcdermott/clean-code-javascript)
- Think of DX by organizing you components if you're using any (this can be done even with pure JS)
- Using typescript or flow is a plus

