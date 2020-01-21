import Product from "./models/Product";
import Category from "./models/Category";
import Cart from "./models/Cart";

export default class StoreService {
    constructor() {
        this.objects = {};
    }

    set(storeKey, data) {
        this.objects[storeKey] = data;
    }

    get(storeKey) {
        return this.objects[storeKey];
    }

    loadData() {
        this.loadProducts();
        this.loadCart();
    }

    loadProducts() {
        let productsCached = JSON.parse(localStorage.getItem('products')),
            products = [];

        if (productsCached) {
            productsCached.forEach(product => {
                products.push(Product.fromJson(product));
            });
        }

        this.set('products', products);
    }

    loadCategories() {
        let categoriesCached = JSON.parse(localStorage.getItem('categories')),
            categories = [];

        if (categoriesCached) {
            categoriesCached.forEach(category => {
                categories.push(Category.fromJson(category));
            });
        }


        this.set('categories', categories);
    }

    loadCart() {
        this.set('cart', Cart.fromJson(localStorage.getItem('cart')));

    }

    save() {
        for (let objKey in this.objects) {
            localStorage.setItem(objKey, JSON.stringify(this.objects[objKey]));
        }
    }
}