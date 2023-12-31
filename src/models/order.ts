import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

// Document interface
interface Order {
    name: string;
    email: string;
    products: (string | number | ObjectId)[];
    bill: number;
    timeofOrder: Date;
    isCancelled: boolean;
    paymentSettled: boolean;
}

// Schema
const orderSchema = new Schema<Order>({
    name: { type: String, required: true },
    email: { type: String, required: true, ref: 'user' },
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
    bill: { type: Number, required: true },
    timeofOrder: { type: Date, default: Date.now },
    isCancelled: { type: Boolean, default: false },
    paymentSettled: { type: Boolean, default: false }
});

const Order = model<Order>('Order', orderSchema);

export default Order;