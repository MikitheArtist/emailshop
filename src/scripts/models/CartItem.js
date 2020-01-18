import Product from "./Product";
import Cart from "../cart/Cart";

export default class CartItem {
    constructor({
        product = new Product(),
        quantity = 1
                } = {}) {
        this.product = product;
        this.quantity = quantity;
    }

    reduceQuantity(quantity) {
        if (this.product.quantity === 0) {
            console.error('Not enough products');
            return;
        }

        if (this.product.quantity < quantity) {
            quantity = this.product.quantity;
        }

        this.product.quantity -= quantity;
        this.quantity += quantity;
    }

    increaseQuantity(quantity) {
        if (this.product.quantity === 0) {
            console.error('Not enough products');
            return;
        }

        if (this.product.quantity < quantity) {
            quantity = this.product.quantity;
        }

        this.product.quantity -= quantity;
        this.quantity += quantity;
    }

    static create({product = new Product(), quantity = 1} = {}) {
        if (product.quantity === 0) {
            console.error(`Can't add product to cart, not enough quantity`);
            return null;
        }

        if (product.quantity < quantity) {
            quantity = product.quantity;
        }

        product.quantity -= quantity;

        return new this({
            product,
            quantity,
        });
    }
}