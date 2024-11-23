import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}
// Configura o armazenamento temporário de arquivos enviados
const upload = multer({dest: "./uploads"});

const routes = (app) => {
    // Permite que o Express interprete dados enviados no formato JSON
    app.use(express.json());

    app.use(cors(corsOptions));

    // Rota para listar todos os posts (método GET)
    app.get("/posts", listarPosts);

    // Rota para criar um novo post (método POST)
    app.post("/posts", postarNovoPost);

    // Rota para fazer upload de uma imagem (método POST)
    // O parâmetro "imagem" indica o nome do campo no formulário HTML
    // O middleware "upload.single('imagem')" trata o upload do arquivo
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;