import express from 'express';
import { productModels } from '../dao/MongoDb/models/products.js';


const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index', {})
})

router.get('/realTimeProducts', (req, res) =>{
    res.render('realTimeProducts')
})

router.get('/products', (req, res) =>{
    res.render('products')
})

router.get("/chat", (req, res) => {
    res.render("chat");
});

export default router;