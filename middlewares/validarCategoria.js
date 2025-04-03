export const validarCategoria = (req, res, next) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || nombre.trim() === "") {
      return res.status(400).json({ mensaje: "El nombre de la categoría es obligatorio" });
  }

  if (descripcion && descripcion.trim() === "") {
      return res.status(400).json({ mensaje: "La descripción no puede estar vacía" });
  }

  next();
};

