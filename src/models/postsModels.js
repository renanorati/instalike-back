// Importa a função conectarAoBanco do arquivo dbConfig.js
// (provavelmente essa função conecta ao banco de dados)
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a função importada
// e a string de conexão armazenada na variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Acessa o banco de dados "imersao-instabytes" a partir da conexão
    const db = conexao.db("imersao-instabytes");  
    // Recupera a coleção "posts" do banco de dados
    const colecao = db.collection("posts");  
    // Busca todos os documentos da coleção "posts" e os converte para um array
    return colecao.find().toArray();
}