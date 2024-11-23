import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Configura as opções do CORS para permitir requisições do endereço http://localhost:8000
const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento temporário de arquivos enviados
const upload = multer({dest: "./uploads"});

const routes = (app) => {
    // Habilita o Express a interpretar dados enviados no formato JSON
    app.use(express.json());

    // Aplica as configurações de CORS para permitir requisições de diferentes origens
    app.use(cors(corsOptions));

    // Rota para listar todos os posts:
    // - Recebe requisições GET para a rota '/posts'
    // - Chama a função 'listarPosts' para buscar e retornar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um novo post:
    // - Recebe requisições POST para a rota '/posts'
    // - Chama a função 'postarNovoPost' para criar um novo post com os dados enviados no corpo da requisição
    app.post("/posts", postarNovoPost);

    // Rota para fazer upload de uma imagem:
    // - Recebe requisições POST para a rota '/upload'
    // - Utiliza o middleware 'upload.single("imagem")' para tratar o arquivo enviado no campo 'imagem' do formulário
    // - Chama a função 'uploadImagem' para processar a imagem e salvar no servidor
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // Rota para atualizar um post existente:
    // - Recebe requisições PUT para a rota '/upload/:id'
    // - O parâmetro ':id' representa o ID do post a ser atualizado
    // - Chama a função 'atualizarNovoPost' para realizar a atualização
    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;