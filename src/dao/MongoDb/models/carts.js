import mongoose from "mongoose";

const cartsCollection = 'carts';

const productSchema = new mongoose.Schema({
    id: Number,
    quantity: Number
});

const cartSchema = new mongoose.Schema({
    id: Number,
    products: [productSchema]
});

 export const cartModels = mongoose.model(cartsCollection, cartSchema)