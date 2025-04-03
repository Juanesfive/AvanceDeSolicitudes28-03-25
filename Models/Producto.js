import connection from "../utils/db.js";

class Producto {
    constructor(nombre, descripcion, precio, categoria_id) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria_id = categoria_id;
    }

    // Obtener todos los productos
    async getAll() {
        try {
            const [rows] = await connection.query("SELECT * FROM productos");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los productos");
        }
    }


    async create(nombre, descripcion, precio, categoria_id = null) {
        try {
            const [result] = await connection.query(
                "INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)",
                [nombre, descripcion, precio, categoria_id]
            );
            return { id: result.insertId, nombre, descripcion, precio, categoria_id };
        } catch (error) {
            console.error("Error en create():", error.message);
            throw new Error("Error al crear el producto: " + error.message);
        }
    }
    


    async update(id) {
        try {
            const [result] = await connection.query(
                "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?",
                [this.nombre, this.descripcion, this.precio, this.categoria_id, id]
            );
            if (result.affectedRows === 0) throw new Error("Producto no encontrado");
            return { id, ...this };
        } catch (error) {
            throw new Error("Error al actualizar el producto");
        }
    }

    // Actualización parcial de un producto
    async patch(id, campos) {
        try {
            let sql = "UPDATE productos SET ";
            const values = [];

            Object.keys(campos).forEach((key, index) => {
                sql += `${key} = ?${index < Object.keys(campos).length - 1 ? ", " : " "}`;
                values.push(campos[key]);
            });

            sql += "WHERE id = ?";
            values.push(id);

            const [result] = await connection.query(sql, values);
            if (result.affectedRows === 0) throw new Error("Producto no encontrado");

            return { id, ...campos };
        } catch (error) {
            throw new Error("Error al actualizar parcialmente el producto");
        }
    }


    async delete(id) {
        try {
            const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id]);
            if (result.affectedRows === 0) throw new Error("Producto no encontrado");
            return { mensaje: "Producto eliminado correctamente" };
        } catch (error) {
            throw new Error("Error al eliminar el producto");
        }
    }
}

export default Producto;
