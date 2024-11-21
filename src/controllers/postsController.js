import { getTodosPosts } from "../models/postsModels.js";

export async function listarPosts(req, res) {
    // Chama a função getTodosPosts para buscar todos os posts
    const posts = await getTodosPosts();
    // Envia uma resposta com o código de status 200 (OK)
    // e os posts recuperados como dados JSON
    res.status(200).json(posts);
}