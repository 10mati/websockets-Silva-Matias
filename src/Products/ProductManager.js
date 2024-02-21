import { promises as fs } from 'fs'


class ProductManager {
    constructor() {
        this.path = "./src/Models/Products.json"
    }

    readProducts = async () => {
        let products;
    try {
        products = await fs.readFile(this.path, "utf-8")
    } catch (error) {
        products = "[]"
    }
    return JSON.parse(products)
    }

    writeProducts = async (products) => {
        await fs.writeFile(this.path, JSON.stringify(products));
    }

    addProducts = async (product) => {
        let productOld = await this.readProducts()
        if (!productOld) return "Error: No se pudo leer el archivo Products.json"
        const lastId = productOld.length > 0 ? productOld[productOld.length - 1].id + 1 : 1;
        product.id = lastId;
        let productAll = [...productOld, product];
        await this.writeProducts(productAll)
        return "Producto Agregado";
    }

    getProduct = async () => {
        return await this.readProducts()
    }

    getProductById = async (id) => {
        let products = await this.readProducts()
        let productById = products.find(prod => prod.id === id)
        if (!productById) return "Producto no encontrado"
        return productById
    }

    deleteProduct = async (id) => {
        let products = await this.readProducts();
        let index = products.findIndex(prod => prod.id === id);

        if (index === -1) {
            return "Producto no encontrado";
        }
        products.splice(index, 1);
        await this.writeProducts(products);
        return "Producto eliminado";
    }


    updateProduct = async (id, updatedProduct) => {
        let products = await this.readProducts()
        let index = products.findIndex((prod) => prod.id === id);
        if (index !== -1) {
            updatedProduct.id = id; // mantenemos el mismo id
            products[index] = { ...products[index], ...updatedProduct };
            await this.writeProducts(products);
            return "Producto actualizado";
        }
        return "Producto no encontrado";
    };

}

export default ProductManager;



