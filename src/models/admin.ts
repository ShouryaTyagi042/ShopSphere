
import { Schema, model } from 'mongoose';

// Document interface
interface Admin {
    name: string;
    email: string;
    password: string;
}

// Schema
const adminSchema = new Schema<Admin>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Admin = model<Admin>('Admin', adminSchema);

export default Admin;