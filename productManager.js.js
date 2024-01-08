const fs = require("fs").promises;

// CLASE
class productManager {
  constructor(archivo) {
    this.path = archivo;

    this.products = [];
  }
  static id = 0;
 
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    // ver codigo repetido
    let colecciones = await this.getProducts();
    let codeRep = colecciones.some((i) => i.code === code);
    if (codeRep) {
      console.log(`Error, code ${code} esta repetido.`);
    } else {
      const newProduct = { title, description, price, thumbnail, code, stock };
      // Comprueba que todos los campos sean obligatorios.

      if (!Object.values(newProduct).includes(undefined)) {
        productManager.id++; // Con cada producto nuevo, aumenta el ID en uno, de esta forma no se repiten.
        this.products.push({
          ...newProduct,
          id: productManager.id,
        });
        await fs.writeFile(this.path, JSON.stringify(this.products));
      } else {
        console.log(`Por favor, completar los campos faltantes del producto "${title}"`);
      }
    }
  };


  getProducts = async () => {
    try {
      let colecciones = await fs.readFile(this.path, "utf-8");
      return JSON.parse(colecciones);
    } catch (error) {
      await fs.writeFile(this.path, "[]");
      let colecciones = await fs.readFile(this.path, "utf-8");
      return JSON.parse(colecciones);
    }
  };


  getProductById = async (id) => {
    let colecciones = await this.getProducts();
    if (!colecciones.find((i) => i.id == id)) {
      console.log(`Producto con ID: "${id}", no existe.`);
    } else {
      console.log(colecciones.find((i) => i.id == id));
      return colecciones.find((i)=> i.id == id);
    }
  };

  /*getXProduct = async (x) => {
    try {
      let colecciones = await fs.readFile(this.path, "utf-8");
      return JSON.parse(colecciones);
    } catch (error) {
      await fs.writeFile(this.path, "[]");
      let colecciones = await fs.readFile(this.path, "utf-8");
      return JSON.parse(colecciones);
    }
  };*/


  deleteProduct = async (id) => {
    let colecciones = await this.getProducts();

    let listaNueva = colecciones.filter((i) => i.id !== id);
    await fs.writeFile(this.path, JSON.stringify(listaNueva));
  };

  updateProduct = async (id, campo, valor) => {
    let colecciones = await this.getProducts();
    let productoIndex = colecciones.findIndex((i) => i.id === id);

    if (productoIndex !== -1) {
        colecciones[productoIndex][campo] = valor;
        await fs.writeFile(this.path, JSON.stringify(colecciones));
    } else {
        console.log(`Not found id: ${id}`);
    }
    
    
  };

  test = async () => {
    //Primer llamada = arreglo vacio
console.log(await producto.getProducts());
    //Agregamos productos
    await producto.addProduct(
      "Producto1",
      "Este es el primer producto se borra con el testing",
      200,
      "Sin imagen",
      "abc123",
      25
    ); // Producto 1
    await producto.addProduct(
      "Producto2",
      "descripcion2",
      500,
      "Imagen2",
      "abc124",
      10
    ); // Producto 2
    //Validacion de codigo repetido
    await producto.addProduct(
      "Codigo repetido",
      "Producto de prueba para codigo",
      1000,
      "Imagen3",
      "abc124",
      70
    ); 
    //Validación de campos faltantes
    await producto.addProduct(
      "Licuadora",
      500,
      "Imagen",
      "abc125",
      30
    ); 
    //más productos
    await producto.addProduct(
      "Producto3",
      "descripcion 3",
      10000,
      "img 3",
      "abc126",
      10
    ); // Producto 3
    await producto.addProduct(
      "Producto4",
      "Este producto también se va a borrar en el testing",
      5000,
      "img 4",
      "abc127",
      80
    ); // Producto 4
    await producto.addProduct(
      "producto5",
      "descripcion 5",
      500,
      "img 5",
      "abc128",
      50
    ); // Producto 5
    await producto.addProduct(
      "producto6",
      "descripcion 6",
      5300,
      "img 6",
      "abc129",
      70
    ); //producto 6
    await producto.addProduct(
      "producto7",
      "descripcion 7",
      5500,
      "img 7",
      "abc130",
      50
    ); //producto 7
    await producto.addProduct(
      "producto8",
      "descridspcion 8",
      5800,
      "img 8",
      "abc131",
      60
    ); //producto 8
    await producto.addProduct(
      "producto9",
      "descridspcion 9",
      5809,
      "img 9",
      "abc132",
      20
    ); //producto 9
    await producto.addProduct(
      "producto10",
      "descridspcion 10",
      58010,
      "img 10",
      "abc133",
      30
    ); //producto 10
    await producto.addProduct(
      "producto11",
      "descridspcion 11",
      5811,
      "img 11",
      "abc134",
      30
    ); //producto 11
    await producto.addProduct(
      "producto12",
      "descridspcion 12",
      6000,
      "img 12",
      "abc135",
      30
    ); //producto 12
    //update

    await producto.deleteProduct(1);
    await producto.deleteProduct(4);

    await producto.updateProduct(6, "title", "Cambio de nombre")

    //Segunda llamada
 console.log(await producto.getProducts());



//buscar productos por ID
await producto.getProductById(2);
await producto.getProductById(3);
await producto.getProductById(5);
await producto.getProductById(4);

//Producto no encontrado
await producto.getProductById(15);

  };
}

// Se agregan productos.
const producto = new productManager("./listadoDeProductos.json");


producto.test();
module.exports = new productManager("./listadoDeProductos.json");