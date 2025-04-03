import express from "express";
import ProductoController from "../controller/ProductoController.js";
import { validarProducto } from "../middlewares/validarProducto.js";

const router = express.Router();


router.get("/", ProductoController.getAllProductos);
router.post("/", validarProducto, ProductoController.createProducto);
router.put("/:id", validarProducto, ProductoController.actualizarProducto);
router.patch("/:id", ProductoController.actualizarParcialProducto);
router.delete("/:id", ProductoController.eliminarProducto);

export default router;

