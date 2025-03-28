
import Categoria from "../Models/Categoria.js";

class CategoriaController {
  static getAllCategorias = async (req, res) => {
    const OBJCategoria = new Categoria();
    const categorias = await OBJCategoria.getAll();
    res.json(categorias);
  }

  static createCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    console.log(nombre,descripcion);
    
    try {      
      const OBJCategoria = new Categoria(nombre, descripcion);
      const categoria = await OBJCategoria.create();
      res.status(201);
      json(categoria);
    } catch (error) {
      throw new Error("No se puedo crear la nueva crear Categoria ");
    }
  };
}

export default CategoriaController;
