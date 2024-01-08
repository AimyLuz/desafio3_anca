const productManagerApp = require("./productManager.js");
const express = require('express');
const app = express();
const port = 3000;



app.get('/ping', (req, res) => {
  res.send('Pong');
})

app.get("/products/:id", async (req, res)=>{
  try {
    req.query.limit
    let id = req.params.id;
    console.log(req.params.id);
    // Llamado a productManager
    
    let producto = await productManagerApp.getProductById(id); 
    // Salida
    res.send(producto);
  } catch (error) {
    // Manejar errores aquí
    console.error(error.message); // Imprime el mensaje de error en la consola
    res.status(404).send('Producto no encontrado'); // Envía una respuesta 404 al cliente
  }
})


app.get('/products', async (req, res) => {
    try {
      // Llamado a productManager
      let productos = await productManagerApp.getProducts();
      // Salida
      res.send(productos);
    } catch (error) {
      // Manejar errores aquí
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });
  

app.listen(port, () => {
  console.log(`Aplicación funcionando en el puerto ${port}`)
})