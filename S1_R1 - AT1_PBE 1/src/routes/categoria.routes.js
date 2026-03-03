import { Router } from "express";
import { categoriaController } from "../controllers/categoriaController.js";

const categoriaRoutes = Router();

categoriaRoutes.post("/", categoriaController.criarCategoria);
categoriaRoutes.get("/", categoriaController.listarCategorias);

export default categoriaRoutes;