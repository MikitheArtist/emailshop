import Mustache from 'mustache';
import Cart from "../models/Cart";

export default class CartRenderer {
    constructor(cart, {
        headerCartSelect = '.header-tools-item'
    } = {}) {
        this.cart = cart;
        this.headerCartEl = document.querySelector(headerCartSelect);
    }

    updateHeaderCart() {
        this.headerCartEl.querySelector('.header-tools-item-badge').innerHTML = this.cart.cartItems.length;
        this.assignListener();
    }


    assignListener() {


        document.querySelector('.header-tools-item').addEventListener('click', () => {

            let cartDiv = document.querySelector('.hello-div');

            cartDiv.innerHTML = '';

            let productTMPL = document.getElementById('cart-item').innerHTML;

            this.cart.cartItems.forEach((cartItem) => {
                cartDiv.innerHTML += Mustache.render(productTMPL, cartItem);
            });


            document.querySelector('.hello-div-content').classList.add("hello-div-content-active");

        });


        document.addEventListener('click', function (event) {
            if (event.target.tagName === 'button') {
                if (event.target.classList.contains('remove_button')) {
                    let target = event.target.closest('.product-item');
                    console.log(target);
                    this.cart.removeProduct(target.dataset.id);
                }
            }

        });

        /*// Удаляем товар


        //чистим корзину
        document.querySelector('.button_clean_out').addEventListener('click', () => {

            this.cart.clear();
        });*/

        document.querySelector('.close').addEventListener('click', () => {

            document.querySelector('.hello-div-content').classList.remove("hello-div-content-active");
        });


    }


}