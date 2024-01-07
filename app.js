const productManagerApp = require("./productManager.js")
const express = require('express')
const app = express()
const port = 3000

app.get('/ping', (req, res) => {
  res.send('Pong');
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