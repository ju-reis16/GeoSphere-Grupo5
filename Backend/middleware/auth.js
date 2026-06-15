const jwt = require("jsonwebtoken");

//verifica se o token JWT é válido
function auth(req, res, next) {

  // Lê o header 
  const authHeader = req.headers.authorization;

  // Rejeita a requisição se o header não for enviado
  if (!authHeader) {
    return res.status(401).json({
      message: "Token não informado",
    });
  }

  // Extrai apenas o token do header
  const token = authHeader.split(" ")[1];

  try {
    // Verifica o token usando a chave secreta
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // dados do usuário decodificado 
    req.user = decoded;

    // Passa o controle para o próximo middleware ou rota
    next();
  } catch (error) {
    
    // Token expirado, adulterado ou inválido
    return res.status(401).json({
      message: "Token inválido",
    });
  }
}

module.exports = auth;