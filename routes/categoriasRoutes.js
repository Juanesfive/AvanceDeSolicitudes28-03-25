import express from "express";
import CategoriaController from "../controller/categoriaController.js";

const router = express.Router();

router.get("/", CategoriaController.getAllCategorias);

router.post("/", (req, res) => {
  console.log(req.body);
});

router.put("/:id", (req, res) => {
  console.log(req.body);
});

export default router;
