// Importa o Express para criar o servidor web
import express from "express";
// Importa o as Rotas
import routes from "./src/routes/postsRoutes.js";

// Cria uma aplicação Express
const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 3000 e imprime uma mensagem no console
app.listen(3000, () => {
  console.log("Servidor escutando na porta 3000");
});