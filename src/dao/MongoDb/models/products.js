import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = new mongoose.Schema ({
    title: String,
    description: String,
    code: Number,
    price: Number,
    stock: Number,
    category: String
})

 export const productModels = mongoose.model(productCollection, productSchema)