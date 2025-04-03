import Categoria from "../Models/Categoria.js";

class CategoriaController {
    
    static getAllCategorias = async (req, res) => {        
        try {
            const OBJCategoria = new Categoria(); 
            const categorias = await OBJCategoria.getAll(); 
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las categorías" });
        }
    };

    static createCategoria = async (req, res) => {
        const { nombre, descripcion } = req.body;         
        try {
            const OBJCategoria = new Categoria(); 
            const categoria = await OBJCategoria.create(nombre, descripcion); 
            res.status(201).json(categoria);
        } catch (error) {
            res.status(500).json({ error: "Error al crear la categoría" });
        }
    };

    static updateCategoria = async (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;  
        try {
            const OBJCategoria = new Categoria();
            const categoria = await OBJCategoria.update(nombre, descripcion, id);
            res.json(categoria);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la categoría" });
        }
    };

    static patchCategoria = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const OBJCategoria = new Categoria();
            const categoria = await OBJCategoria.patch(id, campos);
            res.json(categoria);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar parcialmente la categoría" });
        }
    };

    static deleteCategoria = async (req, res) => {
        const { id } = req.params;
        try {
            const OBJCategoria = new Categoria();
            const result = await OBJCategoria.delete(id);
            res.json({ mensaje: "Categoría eliminada correctamente", result });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la categoría" });
        }
    };
}

export default CategoriaController;

