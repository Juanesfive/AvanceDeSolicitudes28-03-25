import connection from "../utils/db.js";

class producto{
    constructor(nombre, descripcion,precio,categoria_id){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria_id = categoria_id;
    }
    /**
     * Método para obtener los registros de la base de datos
     * @returns {Array} Listado de las categorias en un arreglo
     */
    async getAll(){
        try {
            const [rows] = await connection.query("SELECT * FROM productos");
            return rows;    
        } catch (error) {
            throw new Error("Error al obtener las categorías");
        }        
    }

    async create() {
        try {            
            const [result] = await connection.query("INSERT INTO productos (nombre, descripcion,precio,categoria_id) VALUES (?,?)", [this.nombre, this.descripcion, this.precio, this.categoria_id]);
        return {
            id: result.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            categoria_id: this.categoria_id
        };
        } catch (error) {
          throw new Error("Error al crear la categpría");  
        }
    }
}

export default producto;