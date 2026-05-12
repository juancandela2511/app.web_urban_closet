const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Producto = require("./models/Producto");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://juancandela2511_db_user:1012332747Js%2E@cluster0-shard-00-00.bmj8bmm.mongodb.net:27017,cluster0-shard-00-01.bmj8bmm.mongodb.net:27017,cluster0-shard-00-02.bmj8bmm.mongodb.net:27017/tienda?ssl=true&replicaSet=atlas-13p930-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("MongoDB conectado 🔥"))
  .catch(err => {
    console.log("No se pudo conectar a la base de datos.");
    console.log(err);
  });

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

app.post("/productos", async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: "Error al guardar producto" });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});