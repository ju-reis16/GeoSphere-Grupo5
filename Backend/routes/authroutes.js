const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.AUTH_USER ||
      password !== process.env.AUTH_PASSWORD
    ) {
      return res.status(401).json({
        message: "Email ou senha inválidos",
      });
    }

    const usuario = {
      nome: "Professor",
      email: process.env.AUTH_USER,
    };

    const token = jwt.sign(
      {
        email: usuario.email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.json({
      token,
      usuario,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;