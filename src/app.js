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
const productsManager = new ProductManager();


app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars')

//app.use(express.static(__dirname + "/Public"))}
app.use(express.static('Public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.use("/api/products", ProductRouter)
app.use("/api/carts", cartRouter)
app.use("/", viewRouter)
app.use("/realTimeProducts", viewRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor con express Puerto ${PORT}`);
})

const socketServer = new Server(httpServer);

app.get("/", async (req, res) => {
  const id = req.params.id;
  const limit = req.query.limit;
  try {
      if (!!id) {
          res.send(await productsManager.getProductById(id));
      } else {
          return res.render("home", { products: await productsManager.getAllProducts(limit) });
      }
  } catch (error) {
      console.log(error);
      res.status(500).send({ error: -1, description: "Error fetching products" });
  }
});

app.get("/realTimeProducts", async (req, res) => {
  return res.render("realTimeProducts");
});

socketServer.on('connection', (socket) => {
  console.log('User connected');

  socket.on('new-product', async (product) => {
    console.log('New product:', product);
    await productsManager.saveProduct(product);
    socket.emit('new-product-list', await productsManager.getAllProducts());
});

  socket.on('delete-product', (productId) => {
      console.log('Delete product:', productId);
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});