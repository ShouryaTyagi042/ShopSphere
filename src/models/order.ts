import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

// Document interface
interface Order {
    name: string;
    email: string;
    products: any;
    bill: number;
    timeofOrder: Date
}

// Schema
const orderSchema = new Schema<Order>({
    name: { type: String, required: true },
    email: { type: String, required: true },
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
    timeofOrder: { type: Date, default: Date.now }
});

const Order = model<Order>('Order', orderSchema);

export default Order;