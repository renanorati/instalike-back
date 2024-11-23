import { ObjectId } from "mongodb";
// Importa a função conectarAoBanco do arquivo dbConfig.js
// Essa função estabelece a conexão com o banco de dados MongoDB usando a string de conexão fornecida.
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão armazenada na variável de ambiente STRING_CONEXAO.
// O resultado da conexão é armazenado na constante conexao.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados.
export async function getTodosPosts() {
    // Obtém o banco de dados "imersao-instabytes" a partir da conexão estabelecida.
    const db = conexao.db("imersao-instabytes");  
    // Obtém a coleção "posts" dentro do banco de dados.
    const colecao = db.collection("posts");  
    // Busca todos os documentos da coleção "posts" e retorna um array com os resultados.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    // Obtém o banco de dados "imersao-instabytes" e a coleção "posts".
    const db = conexao.db("imersao-instabytes");  
    const colecao = db.collection("posts");
    // Insere um novo documento (post) na coleção "posts" e retorna um objeto com informações sobre a operação de inserção.
    return colecao.insertOne(novoPost);    
}

export async function atualizarPost(id, novoPost) {
    // Obtém o banco de dados "imersao-instabytes" e a coleção "posts".
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    // Converte o ID fornecido para um objeto ObjectId do MongoDB.
    const objID = ObjectId.createFromHexString(id);
    // Atualiza o documento com o ID correspondente, substituindo os campos existentes pelos novos valores.
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});    
}