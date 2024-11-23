import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModels.js";

export async function listarPosts(req, res) {
    // Busca todos os posts do banco de dados
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com código 200 (sucesso) e os posts em formato JSON
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    // Extrai os dados do novo post da requisição
    const novoPost = req.body;

    try {
        // Chama a função para criar um novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Envia uma resposta HTTP com código 200 (sucesso) e o post criado
        res.status(200).json(postCriado);
    } catch (erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma resposta HTTP com código 500 (erro interno do servidor)
        // e uma mensagem de erro genérica
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    // Cria um objeto com os dados do novo post, incluindo o nome do arquivo
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // Chama a função para criar um novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Constrói o novo nome do arquivo com o ID do post
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia o arquivo para o novo nome
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia uma resposta HTTP com código 200 (sucesso) e o post criado
        res.status(200).json(postCriado);
    } catch (erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma resposta HTTP com código 500 (erro interno do servidor)
        // e uma mensagem de erro genérica
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    // Extrai os dados do novo post da requisição
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        // Geração do objeto para atualização
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };
        // Chama a função para criar um novo post no banco de dados
        const postCriado = await atualizarPost(id, post);
        // Envia uma resposta HTTP com código 200 (sucesso) e o post criado
        res.status(200).json(postCriado);
    } catch (erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma resposta HTTP com código 500 (erro interno do servidor)
        // e uma mensagem de erro genérica
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}