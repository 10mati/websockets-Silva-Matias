import express from "express";
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import { Server } from "socket.io";
import ProductRouter  from "./routes/product.routes.js";
import cartRouter  from "./routes/carts.routes.js";
import viewRouter from "./routes/views.routes.js"
import ProductManager from "./Products/ProductManager.js";


const app = express();
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + "/Public"))


app.use("/api/products", ProductRouter)
app.use("/api/carts", cartRouter)
app.use("/", viewRouter)
app.use("/realTimeProducts", viewRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor con express Puerto ${PORT}`);
})

const socketServer = new Server(httpServer);

const getProducts = async () => {
  const productManager = new ProductManager();
  return await productManager.getProduct();
}

const addProducts = async (product) => {
 const productManager = new ProductManager();
 return await productManager.addProducts(product);
}

socketServer.on('connection', async (socket) => {
    console.log('Cliente conectado');
    const products = await getProducts();
    socket.emit('products', products);

    const newProducts = await addProducts();
    socket.emit('products', newProducts);

  socket.on('msgKey', data => {
   console.log(data);
  })

  socketServer.on('connection', async (socket) => {
    console.log('Cliente conectado');
  
    const products = await getProducts();
    socket.emit('products', products);
  
    socket.on('new-product', async (newProduct) => {
      const newProducts = await addProducts(newProduct);
      socket.emit('products', newProducts);
    });
   })
  
   


});