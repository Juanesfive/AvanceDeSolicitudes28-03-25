import Producto from "../Models/Producto.js";
import connection from "../utils/db.js";

class ProductoController {
    // Obtener todos los productos
    static getAllProductos = async (req, res) => {
        try {
            const OBJProducto = new Producto();
            const productos = await OBJProducto.getAll();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Crear un nuevo producto
    static createProducto = async (req, res) => {
        console.log("Datos recibidos:", req.body);

        let { nombre, descripcion, precio, categoria_id } = req.body;

        try {
            
            if (categoria_id) {
                const [categoria] = await connection.query(
                    "SELECT id FROM categorias WHERE id = ?",
                    [categoria_id]
                );
                if (categoria.length === 0) {
                    return res.status(400).json({ error: "La categoría no existe" });
                }
            } else {
                categoria_id = null; 
            }

            const OBJProducto = new Producto();
            const producto = await OBJProducto.create(nombre, descripcion, precio, categoria_id);
            res.status(201).json(producto);
        } catch (error) {
            res.status(500).json({ error: "Error al crear el producto: " + error.message });
        }
    };

    static actualizarProducto = async (req, res) => {
        const { id } = req.params;
        let { nombre, descripcion, precio, categoria_id } = req.body;

        try {
            
            if (categoria_id) {
                const [categoria] = await connection.query(
                    "SELECT id FROM categorias WHERE id = ?",
                    [categoria_id]
                );
                if (categoria.length === 0) {
                    return res.status(400).json({ error: "La categoría no existe" });
                }
            } else {
                categoria_id = null; 
            }

            const OBJProducto = new Producto(nombre, descripcion, precio, categoria_id);
            const producto = await OBJProducto.update(id);
            res.json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    static actualizarParcialProducto = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;

        try {
           
            if (campos.categoria_id) {
                const [categoria] = await connection.query(
                    "SELECT id FROM categorias WHERE id = ?",
                    [campos.categoria_id]
                );
                if (categoria.length === 0) {
                    return res.status(400).json({ error: "La categoría no existe" });
                }
            }

            const OBJProducto = new Producto();
            const producto = await OBJProducto.patch(id, campos);
            res.json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    static eliminarProducto = async (req, res) => {
        const { id } = req.params;
        try {
            const OBJProducto = new Producto();
            const mensaje = await OBJProducto.delete(id);
            res.json(mensaje);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

export default ProductoController;


