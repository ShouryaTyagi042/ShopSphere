import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

// Document interface
interface Cart {
    user: string;
    products: any;
    bill: number;
}

// Schema
const cartSchema = new Schema<Cart>({
    user: { type: String, required: true },
    products: [{
        productId: {
            type: ObjectId,
            ref: 'Product',
            required: true,
        },
        name: { type: String, required: true },
        quantity: {
            type: Number,
            min: 1,
            default: 1,
            required: true,
        },
        price: { type: Number, required: true }
    }],
    bill: { type: Number, default: 0 }
});

const Cart = model<Cart>('Cart', cartSchema);

export default Cart;