import express from "express"
import imagemRoutes from "./routes/imagem.routes.js"
import path from 'path';
import 'dotenv/config';

const app = express();
app.use('/', imagemRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
})