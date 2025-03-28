import connection from "../utilis/db.js";

class Categoria {
  constructor(nombre, nescripcion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

  /**
   * Metodo para obtener los registros de la base de datos
   * @returns {Array} Listado de las categorias en un arreglo
   */
  async getAll() {
    try {
      // destreturamos el arreglo rows
      const [rows] = await connection.query("SELECT * FROM categorias");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las categorias");
    }
  }
  async create() {
    try {
      const [result] = await connection.query(
        "INSERT INTO categorias (nombre, descripcion) VALUES (?,?)",
        [this.nombre, this.nescripcion]
      );
      return {
        id: result.id,
        nombre: this.nombre,
        descripcion: this.descripcion,
      };
    } catch (error) {
        throw new Error("Error al crear la categoria");
        
    }
  }
}

export default Categoria;
