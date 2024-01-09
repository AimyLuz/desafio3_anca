const productManagerApp = require("./productManager.js");
const express = require("express");
const app = express();
const port = 8080;

app.get("/ping", (req, res) => {
  res.send("Pong");
});
app.get("/products", async (req, res) => {
  try {
        // Llamado a productManager
    let productos = await productManagerApp.getProducts();
    //limite query
    const { limit } = req.query;
    if (!limit) {
      res.send(productos);//enviar todos los productos
    } else if (Number.isInteger(Number(limit)) && Number(limit) > 0) {
      res.send(productos.slice(0, limit)); //transformar en numero el string y enviar el limit
    } else {
      res.send(`El límite ${limit} es inválido.`);//ingreso de datos no validos
    }
  } catch (error) {
    // Salida
    // Manejar errores aquí
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(req.params.id);
    // Llamado a productManager

    let producto = await productManagerApp.getProductById(id);
    // Salida
    res.send(producto);
  } catch (error) {
    // Manejar errores aquí
    console.error(error.message); // Imprime el mensaje de error en la consola
    res.status(404).send("Producto no encontrado"); // Envía una respuesta 404 al cliente
  }
});



app.listen(port, () => {
  console.log(`Aplicación funcionando en el puerto ${port}`);
});
