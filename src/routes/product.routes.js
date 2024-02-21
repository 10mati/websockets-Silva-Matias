import { Router } from "express";
import ProductManager from "../Products/ProductManager.js";


const ProductRouter = Router()
const product = new ProductManager()


ProductRouter.get("/", async (req, res) => {
    try {
        res.send(await product.getProduct())
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los productos' })
    }
})

ProductRouter.get("/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        res.send(await product.getProductById(id))
    } catch (error) {
        res.status(404).send({ error: 'Producto no encontrado' })
    }
})

ProductRouter.post("/", async (req, res) => {
    try {
        let newproduct = req.body
        res.send(await product.addProducts(newproduct))
    } catch (error) {
        res.status(500).send({ error: 'Error al agregar el producto' })
    }
})

ProductRouter.delete("/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        res.send(await product.deleteProduct(id))
    } catch (error) {
        res.status(500).send({ error: 'Error al eliminar el producto' })
    }
})

ProductRouter.put("/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let updateProduct = req.body
        res.send(await product.updateProduct(id, updateProduct))
    } catch (error) {
        res.status(500).send({ error: 'Error al actualizar el producto' })
    }
})


export default ProductRouter;