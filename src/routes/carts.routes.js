import { Router } from "express";
import CartManager from "../Products/CartManager.js";


const CartRouter = Router();
const carts = new CartManager

CartRouter.get("/", async (req, res) => {
    try {
        res.send(await carts.readCarts())
    } catch (error) {
        next(error)
    }
})



CartRouter.get("/:cid", async (req, res) => {
    let id = parseInt(req.params.cid)
    try {
        res.send(await carts.getCartById(id))
    } catch (error) {
        next(error)
    }
})


CartRouter.post("/", async (req, res) => {
    try {
        const newCart = req.body;
        res.send(await carts.addCart(newCart))
    } catch (error) {
        next(error)
    }
})

CartRouter.post("/:cid/products/:pid", async (req, res) => {
    let cartId = parseInt(req.params.cid)
    let productId = parseInt(req.params.pid)
    try {
        res.send(await carts.addProductInCart(cartId, productId))
    } catch (error) {
        next(error)
    }
});



export default CartRouter;