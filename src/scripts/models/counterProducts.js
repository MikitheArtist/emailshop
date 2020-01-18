import Product from "./Product";

export default class counterProducts {
    constructor() {
    }
    getProducts () {
        let products = [];
        let productsLocalStorage = localStorage.getItem('products');
        if (productsLocalStorage !== null) {
            products = JSON.parse(productsLocalStorage);
        }
        return products;
    }


    putProduct(id){
        let products = this.getProducts();
        let index = products.indexOf(id);
        let pushProduct;
        if (index === -1) {
            products.push(id);
            pushProduct = true;
        } else {
            products.splice(index,1);
            pushProduct = false;
        }
        localStorage.setItem('products', JSON.stringify(products));
        return {
            pushProduct: pushProduct,
            products: products
        }
    }
}
