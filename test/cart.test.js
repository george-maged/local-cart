const CartEmitter = require('../src/cart');
const expect = require('chai').expect;
describe('Cart', function () {
    let cartEmitter;
    beforeEach((done) => {
        cartEmitter = new CartEmitter();
        done();
    })
    describe('getCart()', () => {
        it('should return an empty Array', function () {
            let cart = cartEmitter.getCart();
            expect(cart).to.be.a('array').to.have.length(0)
        });
    });
    describe('addProduct(product)', () => {
        let cartEmitter;
        beforeEach((done) => {
            cartEmitter = new CartEmitter();
            done();
        })
        it('should add the product', function (done) {
            cartEmitter.subscribe('cart.changed', (newCart) => {
                expect(newCart).to.be.a('array').to.have.length(1)
                expect(newCart[0]).to.be.an('object').to.have.ownProperty('count', 1, 'Initial count should be equal 1')
                expect(newCart[0]).to.be.an('object').to.have.ownProperty('product')
                expect(newCart[0].product).to.be.an('object').to.have.ownProperty('title', 'test', 'Should have the same title we entered')
                done()
            })
            const newProduct = {
                title: 'test'
            }
            cartEmitter.addProduct(newProduct)
        });
        it('should stack products with the same title', function (done) {
            let num = 1;
            cartEmitter.subscribe('cart.changed', (newCart) => {
                expect(newCart).to.be.a('array').to.have.length(1, "Length should stay the same")

                expect(newCart[0]).to.be.an('object').to.have.ownProperty('count', num, 'Count should be equal ' + num)
                expect(newCart[0]).to.be.an('object').to.have.ownProperty('product')
                expect(newCart[0].product).to.be.an('object').to.have.ownProperty('title', 'test', 'Should have the same title we entered')
                if (num === 2) {
                    done()
                }
                num++;
            })
            const newProduct = {
                title: 'test'
            }
            cartEmitter.addProduct(newProduct)
            cartEmitter.addProduct(newProduct)
        });
        it('should add another product', function (done) {
            let num = 1;
            cartEmitter.subscribe('cart.changed', (newCart) => {
                expect(newCart).to.be.a('array').to.have.length(num)
                expect(newCart[num - 1]).to.be.an('object').to.have.ownProperty('count', 1, 'Should not stack products')
                expect(newCart[num - 1]).to.be.an('object').to.have.ownProperty('product')
                expect(newCart[num - 1].product).to.be.an('object').to.have.ownProperty('title', 'test' + num, 'Should have the same title we entered')
                if (num === 2) {
                    done()
                }
                num++
            })
            const newProduct1 = {
                title: 'test1'
            }
            const newProduct2 = {
                title: 'test2'
            }
            cartEmitter.addProduct(newProduct1)
            cartEmitter.addProduct(newProduct2)
        });

    });
    describe('clearCart()', () => {
        let cartEmitter = new CartEmitter();
        cartEmitter.cart = [1]
        it('should empty the Array', function (done) {
            let cart = cartEmitter.getCart();
            expect(cart).to.be.a('array').to.have.length(1)
            cartEmitter.subscribe('cart.changed', (newCart) => {
                expect(newCart).to.have.length(0)
                done()
            })
            cartEmitter.clearCart()
        });
    });
    describe('changeCount(index,value)', () => {
        it('should increase the count by 1',(done)=>{
            cartEmitter.cart = [{
                product:{
                    title:"test"
                },
                count:4
            }]
            cartEmitter.subscribe('cart.changed',(newCart)=>{
                expect(newCart).to.have.length(1)
                expect(newCart[0]).to.be.an('object').to.have.ownProperty('count', 5, 'Initial count should be equal 5')
                expect(newCart[0]).to.be.an('object').to.have.ownProperty('product')
                expect(newCart[0].product).to.be.an('object').to.have.ownProperty('title', 'test', 'Should have the same title we entered')
                done();
            })
            cartEmitter.changeCount(0,1)
        })
        it('should decrease the count by 1',(done)=>{
            cartEmitter.cart = [{
                product:{
                    title:"test"
                },
                count:4
            }]
            cartEmitter.subscribe('cart.changed',(newCart)=>{
                expect(newCart).to.have.length(1)
                expect(newCart[0]).to.be.an('object').to.have.ownProperty('count', 3, 'Initial count should be equal 3')
                expect(newCart[0]).to.be.an('object').to.have.ownProperty('product')
                expect(newCart[0].product).to.be.an('object').to.have.ownProperty('title', 'test', 'Should have the same title we entered')
                done();
            })
            cartEmitter.changeCount(0,-1)            
        })
        it('should remove when count equals 0',(done)=>{
            cartEmitter.cart = [{
                product:{
                    title:"test"
                },
                count:1
            }]
            cartEmitter.subscribe('cart.changed',(newCart)=>{
                expect(newCart).to.have.length(0)
                done();
            })
            cartEmitter.changeCount(0,-1)            
        })
    })
});