import '../styles/index.scss';

import Mustache from 'mustache';

import StoreService from './storeService';

let storeService = new StoreService();
window.storeService = storeService;
import productsCatalog from  './models/catalog';

import Product from './models/Product';

let prdArray = [];
productsCatalog.forEach(product => {
    prdArray.push(new Product(product));
});

localStorage.setItem('products', JSON.stringify(prdArray));
storeService.loadData();


let cart = storeService.get('cart');
let products = storeService.get('products');

// Работа с Mustache
let productTMPL = document.getElementById('product-tpl').innerHTML;

products.forEach(product => {
    document.querySelector('.products-list').innerHTML += Mustache.render(productTMPL, product);
});

Array.from(document.getElementsByClassName('product')).forEach(element => {
    element.addEventListener('click', e => {
        let productEl = e.target.classList.contains('product') ? e.target : e.target.closest('.product');

        if (!productEl) return;

        let product = products.find(prd => prd.id == productEl.dataset.id);

        cart.addProduct(product, 1);
    });
});

window.onunload = function () {
    storeService.save();
};


