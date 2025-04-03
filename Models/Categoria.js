import connection from "../utils/db.js";

class Categoria {

    async getAll() {
        try {
            const [rows] = await connection.query("SELECT * FROM categorias");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener las categorías");
        }
    }

    async create(nombre, descripcion) {
        try {
            const [result] = await connection.query("INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)", [nombre, descripcion]);
            return { id: result.insertId, nombre, descripcion };
        } catch (error) {
            throw new Error("Error al crear la categoría");
        }
    }

    async update(nombre, descripcion, id) {
        try {
            const [result] = await connection.query("UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?", [nombre, descripcion, id]);
            if (result.affectedRows === 0) {
                throw new Error("Categoría no encontrada");
            }
            return { id, nombre, descripcion };
        } catch (error) {
            throw new Error("Error al actualizar la categoría");
        }
    }

    async patch(id, campos) {
        try {
            let sql = "UPDATE categorias SET ";
            const values = [];

            Object.keys(campos).forEach((campo, index) => {
                sql += `${campo} = ?${index < Object.keys(campos).length - 1 ? ", " : " "}`;
                values.push(campos[campo]);
            });

            sql += "WHERE id = ?";
            values.push(id);

            const [result] = await connection.query(sql, values);
            if (result.affectedRows === 0) {
                throw new Error("Categoría no encontrada");
            }
            return { id, ...campos };
        } catch (error) {
            throw new Error("Error al actualizar parcialmente la categoría");
        }
    }

    async delete(id) {
        try {
            const [result] = await connection.query("DELETE FROM categorias WHERE id = ?", [id]);
            if (result.affectedRows === 0) {
                throw new Error("Categoría no encontrada");
            }
            return { id };
        } catch (error) {
            throw new Error("Error al eliminar la categoría");
        }
    }
}

export default Categoria;

