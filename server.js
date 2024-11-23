import express from "express";
// Importa as rotas definidas no arquivo postsRoutes.js. Essas rotas definem as diferentes 
// ações que podem ser realizadas com os posts (criar, ler, atualizar, deletar).
import routes from "./src/routes/postsRoutes.js";

// Cria uma aplicação Express. O objeto app representa a aplicação web.
const app = express();

// Configura a aplicação para servir arquivos estáticos da pasta "uploads".
// Isso é útil para servir imagens ou outros arquivos que foram enviados para o servidor.
app.use(express.static("uploads"));

// Registra as rotas da aplicação. A função routes é chamada com o objeto app como argumento,
// o que permite definir as rotas para diferentes URLs.
routes(app);

// Inicia o servidor na porta 3000 e imprime uma mensagem no console indicando que o servidor está em execução.
app.listen(3000, () => {
  console.log("Servidor escutando na porta 3000");
});