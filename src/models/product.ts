import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

// Document interface
interface Product {
    seller: string; //will change
    name: string;
    description: string;
    price: number;
    category: string;
}

// Schema
const productSchema = new Schema<Product>({
    seller: { type: String, required: true, ref: 'Seller' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
});

const Product = model<Product>('Product', productSchema);

export default Product;