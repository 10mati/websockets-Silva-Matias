import { Router } from "express";
import ProductsService from "../../services/ProductService.js"


const ProductRouter = Router()
const productsService = new ProductsService();

// GET /api/products
ProductRouter.get('/', async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productsService.getAllProducts(parseInt(limit));
    res.status(200).send({ status: "success", payload: products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error",  error: error.message});
  }
});

// GET /api/products/:pid
ProductRouter.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsService.getProductById(pid);
    if (!product) {
      return res.status(404).send({ status: "error",  error: 'Product not found' });
    }
    res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error",  error: error.message});
  }
});

// POST /api/products
ProductRouter.post('/', async (req, res) => {
  const newProduct = req.body;
  try {
    const product = await productsService.addProduct(newProduct);
    res.status(201).send({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error",  error: error.message});
  }
});

// PUT /api/products/:pid
ProductRouter.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await productsService.updateProductById(pid, updatedProductData);
    res.status(201).send({ status: "success", payload: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error",  error: error.message});
  }
});

// DELETE /api/products/:pid
ProductRouter.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  try { 
    await productsService.deleteProductById(pid);
     res.status(205).send({ status: "success", payload: null});
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error",  error: error.message});
  }
});

export default ProductRouter;