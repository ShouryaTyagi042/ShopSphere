import { Schema, model } from 'mongoose';

// Document interface
interface Product {
    sellerEmail: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
}

// Schema
const productSchema = new Schema<Product>({
    sellerEmail: { type: String, required: true, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String, required: true }]
});

const Product = model<Product>('Product', productSchema);

export default Product;