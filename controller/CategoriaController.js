import Categoria from "../Models/Categoria.js";

class CategoriaController {
  static getAllCategorias = async (req, res) => {
    const OBJCategoria = new Categoria();
    const categorias = await OBJCategoria.getAll();
    res.json(categorias);
  };
  // Crear categoria
  static createCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    console.log(nombre, descripcion);

    try {
      const OBJCategoria = new Categoria(nombre, descripcion);
      const categoria = await OBJCategoria.create();
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Actualizar categoria
  static actualizarCategoria = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;

    const { nombre, descripcion } = req.body;
    try {
      const OBJCategoria = new Categoria();
      const Categoria = await OBJCategoria.update(nombre, descripcion, id);
      res.json(Categoria);
      // OBJCategoria.update(id);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Actualizar Parcial categoria
  static actualizarParcialCategoria = (req, res) => {
    const campos = req.body;
    console.log(Object.keys(campos).length);

    let sql = "UPDATE categorias SET";

    for (let i = 0; i < Object.keys(campos).length; i++) {
      let valor = Object.keys(campos)[i];
      sql += `SET ${valor} = ${campos[valor]}`;

      if (i == Object.keys(campos).length - 1) {
        sql += "";
      } else {
        sql += ",";
      }
    }
    sql += `WHERE id= ${id}`;
    console.log(sql);
  };
}

export default CategoriaController;
