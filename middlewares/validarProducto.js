export const validarProducto = (req, res, next) => {
    const { nombre, descripcion, precio, categoria_id } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ mensaje: "El nombre del producto es obligatorio" });
    }
    if (!descripcion || descripcion.trim() === "") {
        return res.status(400).json({ mensaje: "La descripción del producto es obligatoria" });
    }
    if (!precio || isNaN(precio) || precio <= 0) {
        return res.status(400).json({ mensaje: "El precio debe ser un número positivo" });
    }

    // Validación opcional de categoria_id esto permite que categoria_id sea null o undefined
    // pero si se da un valor valido este lo permite.
     if (categoria_id !== undefined && categoria_id !== null) {
        if (isNaN(categoria_id)) {
            return res.status(400).json({ mensaje: "La categoría es inválida" });
        }
    }

    next();
};

