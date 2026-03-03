import { Router } from "express";
import produtoController from "../controllers/xml.controller.js";
import { categoriaController } from "../controllers/categoria.controller.js";
const produtoRoutes = Router();

produtoRoutes.post('/produtos', produtoController.criarProduto);
produtoRoutes.get('/produtos', produtoController.listarProdutos);
produtoRoutes.put('/produtos', produtoController.tualizarProduto);
produtoRoutes.delete('/produtos', produtoController.deletarProduto);
categoriaRoutes.post("/categoria", categoriaController.criarCategoria);
categoriaRoutes.get("/categoria", categoriaController.listarCategorias);



export default produtoController;
