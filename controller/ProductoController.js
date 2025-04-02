import Producto from "../Models/Producto.js";

class ProductoController {
  static getAllProducto = async (req, res) => {
    const OBJProducto = new Producto();
    const productos = await OBJProducto.getAll();
    res.json(productos);
  };

  static createProducto = async (req, res) => {
    const { nombre, descripcion } = req.body;
    console.log(nombre, descripcion);

    try {
      const OBJProducto = new Producto(nombre, descripcion);
      const Producto = await OBJProducto.create();
      res.status(201).json(Producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default ProductoController;
