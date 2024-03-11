import express from "express";
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import { Server } from "socket.io";
import ProductRouter  from "./routes/product.routes.js";
import cartRouter  from "./routes/carts.routes.js";
import viewRouter from "./routes/views.routes.js"
import ProductManager from "./dao/FileSystem/ProductManager.js";
import mongoose from "mongoose";
import { messageModels } from "./dao/MongoDb/models/messages.js";

const app = express();
const PORT = 8080
const productsManager = new ProductManager();


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

const messages = [];
socketServer.on('connection', socket => {
    // Esto lo ve cualquier user que se conecte
    socketServer.emit('messageLogs', messages);



    // aqui vamos a recibir { user: user, message: catBox.value }
    socket.on("message", data => {
      const newMessage = new messageModels({
        user: data.user,
        message: data.message
      });

      newMessage.save()
            .then(() => {
                messages.push(data); 
        // enviamos un array de objetos ---> [{ user: "Juan", message: "Hola" }, { user: "Elias", message: "Como estas?" }]
        socketServer.emit('messageLogs', messages);
    });
  });

    // hacemos un broadcast del nuevo usuario que se conecta al chat
    socket.on('userConnected', data => {
        console.log(data);
        socket.broadcast.emit('userConnected', data.user)
    })


    // Cuando desees cerrar la conexión con este cliente en particular:
    socket.on('closeChat', data => {
        if (data.close === "close")
            socket.disconnect();
    })

})




/*app.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  try {
    const products = await productsManager.getAllProducts(limit);
    res.render("index", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: -1, description: "Error al obtener los productos" });
  }
});

app.get("/realTimeProducts", async (req, res) => {
  const products = await productsManager.getAllProducts(); // Asumiendo que este método devuelve todos los productos
  return res.render("realTimeProducts", { products});
});

socketServer.on('connection', (socket) => {
  console.log('User connected');

  socket.on('new-product', async (product) => {
    await productsManager.saveProduct(product);
    socket.emit('new-product-list', await productsManager.getAllProducts());
});

  socket.on('delete-product', (productId) => {
      console.log('Delete product:', productId);
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});*/

app.get("/products", async (req, res) => {
  try {
    const products = await productModels.insertMany();
    res.send({ result: "success", payload:products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: -1, description: "Error al obtener los mensajes" });
  }
});


app.post("/message", async (req, res) => {
  try {
    const messages = await messagesModels.inserMany();
    res.send({ result: "success", payload:messages });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: -1, description: "Error al guardar los mensajes" });
  }
});


const URL_MONGO = 'mongodb+srv://silvamatias07:J5DdC6lnaBueAeW7@cluster0.6vafnod.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0'
const connectMOngooDb = async () =>{
  try {
    mongoose.connect(URL_MONGO)
    console.log("conectado con exito a MongoDb con Mongoose");
    const db = mongoose.connection;
    await db.createCollection("messages");
  } catch (error) {
    console.log("no se pudo conectara la DB usando Mongose" + error);
    process.exit();
  }
};

connectMOngooDb();