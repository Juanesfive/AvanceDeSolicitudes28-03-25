import connection from "../utils/db.js";

class Categorias {
  constructor(Nombre, Descripcion) {
    // this.Nombre = Nombre;
    // this.Descripcion = Descripcion;
  }
  /**
   * Método para obtener los registros de la base de datos
   * @returns {Array} Listado de las categorias en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM categorias");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las categorías");
    }
  }

  async create(Nombre, Descripcion) {
    try {
      const [result] = await connection.query(
        "INSERT INTO categorias (nombre, descripcion) VALUES (?,?)",
        [Nombre, Descripcion]
      );
      return {
        id: result.id,
        Nombre: Nombre,
        Descripcion: Descripcion,
      };
    } catch (error) {
      throw new Error("Error al crear la categpría");
    }
  }

  async update(Nombre, Descripcion, id) {
    try {
      console.log("Desde la clase ", Nombre, Descripcion, id);
      const [result] = await connection.query(
        "UPDATE categorias SET nombre =? , descripcion =? WHERE id = ? ",
        [Nombre, Descripcion, id]
      );
      if (result.affected === 0) {
        throw new Error("Categoria no encontrada");
      }

      return { id, Nombre: Nombre, Descripcion: Descripcion };
    } catch (error) {}

    // update categorias set nombre = "Juan" , descripcion = "el nombre" where id = 6;
  }
}

export default Categorias;
