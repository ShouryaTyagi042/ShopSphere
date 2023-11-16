import { Schema, model } from 'mongoose';

// Document interface
interface User {
    name: string;
    email: string;
    password: string;
    balance: number;
}

// Schema
const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 1000 },

});

const User = model<User>('User', userSchema);

export default User;