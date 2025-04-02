export const validarCategoria = (req, res, next) => {
  //  console.log("Validando Datos...");

  const { nombre, descripcion } = req.body;

  if (nombre.trim() === "" || !nombre) {
    return res
      .status(400)
      .json({ menseje: "El nombre en la categoria es obligatorio" });
  }
  if (descripcion.trim() === "" || !descripcion) {
    return res
      .status(400)
      .json({ menseje: "la descripcion en la categoria es obligatorio" });
  }

  next();
};
