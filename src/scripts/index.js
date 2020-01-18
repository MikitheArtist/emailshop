import '../styles/index.scss';


import Mustache from 'mustache';

import Product from "./models/Product";
import Store from './store';
import CounterProducts from "./models/counterProducts";

let store = new Store();

let productsArray = [];

for (let i = 1; i <= 10; i++) {
    productsArray.push(new Product({
        id: i,
        title: `Product #${i}`,
        quantity: Math.ceil(Math.random() * i)
    }));
}


store.set('products', productsArray);

let counterProducts = new CounterProducts();

let  id = this.getAttribute('data-id');
let result = counterProducts.putProduct(id);

counterProducts.containerCounter.innerText = result.products.length;



// Работа с Mustache

let productTMPL = document.getElementById('product-tpl').innerHTML;

productsArray.forEach(product => {
    let productHTML = Mustache.render(productTMPL, product);
    document.querySelector('.products-list').innerHTML += productHTML;
});


