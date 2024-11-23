import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
  // Cria uma variável para armazenar o cliente do MongoDB
  let mongoClient;

  try {
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão
    mongoClient = new MongoClient(stringConexao);
    console.log('Conectando ao cluster do banco de dados...');

    // Tenta estabelecer a conexão com o banco de dados
    await mongoClient.connect();
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    // Retorna o cliente conectado para ser utilizado em outras partes do código
    return mongoClient;
  } catch (erro) {
    // Caso ocorra algum erro durante a conexão, imprime uma mensagem de erro no console
    console.error('Falha na conexão com o banco!', erro);

    // Encerra a execução do processo, indicando que a aplicação não pode continuar sem a conexão com o banco de dados
    process.exit();
  }
}