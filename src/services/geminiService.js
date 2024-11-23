import { GoogleGenerativeAI } from "@google/generative-ai";

// Cria uma instância do cliente Google Generative AI utilizando a chave de API armazenada na variável de ambiente GEMINI_API_KEY.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo de linguagem Gemini 1.5 Flash para geração de texto.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função assíncrona para gerar uma descrição em português para uma imagem.
// Recebe como parâmetro um buffer de imagem.
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Prompt padrão para a geração de texto.
  const prompt = "Gere uma descrição em português do brasil para a imagem, escrevendo a descrição resumida diretamente, comentar ou explicar.";

  try {
    // Cria um objeto que representa a imagem, incluindo os dados da imagem em formato base64 e o tipo MIME.
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    // Envia a imagem e o prompt para o modelo de linguagem e aguarda a resposta.
    const res = await model.generateContent([prompt, image]);

    // Extrai o texto da resposta e retorna. Caso ocorra algum erro, retorna uma mensagem padrão.
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Imprime uma mensagem de erro no console e lança uma nova exceção para propagar o erro.
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}