import { ObjectId } from "mongodb";

export interface CartProduct {
    productID: ObjectId;
    price: number;
    name: string;
    quantity: number;
}