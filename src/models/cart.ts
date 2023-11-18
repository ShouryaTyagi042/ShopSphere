import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';


// Document interface
interface Cart {
    userEmail: string;
    products: any;
    bill: number;
}

// Schema
const cartSchema = new Schema<Cart>({
    userEmail: { type: String, required: true, ref: 'User' },
    products: [{
        productId: {
            type: ObjectId,
            ref: 'Product',
            required: true,
        },
        price: { type: Number, required: true },
        name: { type: String, required: true },
        quantity: {
            type: Number,
            min: 1,
            default: 1,
            required: true,
        },
    }],
    bill: { type: Number, default: 0 }
});

const Cart = model<Cart>('Cart', cartSchema);

export default Cart;