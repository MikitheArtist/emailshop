import '../styles/index.scss';

import Mustache from 'mustache';

import StoreService from './storeService';

let storeService = new StoreService();
window.storeService = storeService;
import {productsCatalog} from  './models/catalog';
import {productsCategories} from "./models/productsCategory";
import Product from './models/Product';
import Category from './models/Category';

let ctgArray = [];
productsCategories.forEach(category => {
    ctgArray.push(new Category(category));
});
localStorage.setItem('categories', JSON.stringify(ctgArray));
storeService.loadCategories();
let categories = storeService.get('categories');
//Работа с Mustache
let categoryTMPL = document.getElementById("category-tpl").innerHTML;

categories.forEach(category => {
    document.querySelector(".category-list").innerHTML += Mustache.render(categoryTMPL, category);
});


let prdArray = [];
productsCatalog.forEach(product => {
    prdArray.push(new Product(product));
});


storeService.loadData();
storeService.set('products', prdArray);

let cart = storeService.get('cart');
let products = storeService.get('products');

// Работа с Mustache
let productTMPL = document.getElementById('product-tpl').innerHTML;

let newProducts = products.filter(product => product.is_new === true);

console.log(newProducts);
newProducts.forEach( product => {
    document.querySelector('.products-list').innerHTML += Mustache.render(productTMPL, product);
});

let newFeatured = products.filter(product => product.is_featured === true);
newFeatured.forEach(product => {
    document.querySelector('.featured-list').innerHTML += Mustache.render(productTMPL, product);
});



Array.from(document.getElementsByClassName('products-list')).forEach(element => {
    element.addEventListener('click', e => {
        let productEl = e.target.classList.contains('products') ? e.target : e.target.closest('.products');

        if (!productEl) return;

        let product = products.find(prd => prd.id === productEl.dataset.id);
        console.log(cart);
        cart.addProduct(product, 1);

    });
});

window.onunload = function () {
    storeService.save();
};


