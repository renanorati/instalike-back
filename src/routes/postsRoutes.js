import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
    // Configura o middleware para interpretar dados JSON na requisição
    app.use(express.json());

    // Rota para tratar requisições GET para "/posts"
    app.get("/posts", listarPosts);
};

export default routes;