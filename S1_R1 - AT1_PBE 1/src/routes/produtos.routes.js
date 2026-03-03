import { Router } from "express";
import produtoController from "../controllers/xml.controller.js";
const produtoRoutes = Router();

produtoRoutes.post('/produtos', produtoController.criarProduto);
produtoRoutes.get('/produtos', produtoController.listarProdutos);
produtoRoutes.put('/produtos', produtoController.tualizarProduto);
produtoRoutes.delete('/produtos', produtoController.deletarProduto);

export default xmlroutes;