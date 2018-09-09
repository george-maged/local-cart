class CartEmitter {
    constructor() {
        this.events = {};
        this.cart = []
    }

    emit(eventName, data) {
        const event = this.events[eventName];
        if (event) {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    }

    subscribe(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);
        return () => {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
        }
    }
    addProduct(product) {
        let cart = this.cart.slice(0);
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.title === product.title) {
                cart[i].count++;
                this.cart = cart
                this.emit('cart.changed', this.cart)
                return;
            }
        }
        let productObject = {
            product: product,
            count: 1
        }
        this.cart = [...cart, productObject]
        this.emit('cart.changed', this.cart)
    }
    changeCount(index,value) {
        let cart = this.cart;
        cart[index].count += value;
        if (cart[index].count < 1) {
            cart.splice(index, 1)
        }
        this.emit('cart.changed', this.cart)
    }
    clearCart() {
        this.cart = []
        this.emit('cart.changed', this.cart)
    }
    getCart() {
        return this.cart;
    }

}
module.exports = CartEmitter