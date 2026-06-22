const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Rota de login: valida o token
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    //remove espaços e padroniza o email em minúsculas
    const normalizedEmail =
      typeof email === "string"
        ? email.trim().toLowerCase()
        : "";

    const normalizedPassword =
      typeof password === "string"
        ? password.trim()
        : "";

    // Normaliza as credenciais válidas 
    const validEmail =
      (process.env.AUTH_USER || "")
        .trim()
        .toLowerCase();

    const validPassword =
      (process.env.AUTH_PASSWORD || "")
        .trim();

    // Rejeita o login se email ou senha estiverem erradas
    if (
      normalizedEmail !== validEmail ||
      normalizedPassword !== validPassword
    ) {
      return res.status(401).json({
        message: "Email ou senha inválidos",
      });
    }
      
    const token = jwt.sign(
      {
        email: normalizedEmail,
        role: "admin",
      },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "1h" }
    );

    // Retorna o token e os dados do usuário
    return res.json({
      token,
      usuario: {
        email: normalizedEmail,
        role: "admin",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;