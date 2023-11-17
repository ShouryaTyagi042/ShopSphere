import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

// Document interface
interface Cart {
    user_id: any;
    products: any;
    bill: number;
}

// Schema
const cartSchema = new Schema<Cart>({
    user_id: { type: ObjectId, required: true },
    products: [{
        productId: {
            type: ObjectId,
            ref: 'Product',
            required: true
        },
        name: { type: String, required: true },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: { type: Number, required: true }
    }],
    bill: { type: Number, required: true }
});

const Cart = model<Cart>('Cart', cartSchema);

export default Cart;