import { Schema, model } from 'mongoose';

// Document interface
interface Seller {
    name: string;
    email: string;
    password: string;
    income: number;
}

// Schema
const sellerSchema = new Schema<Seller>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    income: { type: Number, default: 1000 },
});

const Seller = model<Seller>('Seller', sellerSchema);

export default Seller;