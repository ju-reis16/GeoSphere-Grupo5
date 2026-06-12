const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '.env'),
});

const express = require('express');
const cors = require('cors');

// Suas rotas
const router = require('./routes/questoesVestibularesRoutes.js');

// Rotas dela
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Suas rotas
app.use('/', router);

// Rotas dela
app.use('/api', authRoutes);

app.get('/api/dashboard', authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

const PORT = parseInt(process.env.PORT, 10) || 3000;

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 Servidor rodando!');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME || 'não configurado'})`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log('='.repeat(50));
});