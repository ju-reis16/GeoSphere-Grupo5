const model = require('../models/questoesVestibularesModel');

const listar = async (req, res) => {
    try {
        const questoes = await model.listar();
        res.json(questoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarPorVestibular = async (req, res) => {
    try {
        const questoes = await model.buscarPorVestibular(req.params.vestibular);
        res.json(questoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarPorCategoria = async (req, res) => {
    try {
        const questoes = await model.buscarPorCategoria(req.params.categoria);
        res.json(questoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarPorPergunta = async (req, res) => {
    try {
        const questoes = await model.buscarPorPergunta(req.params.palavra);
        res.json(questoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarTemas = async (req, res) => {
    try {
        const temas = await model.buscarTemas(req.params.tema);
        res.json(temas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarMaterialAuxiliar = async (req, res) => {
    try {
        const material = await model.buscarMaterialAuxiliar(req.params.categoria);
        res.json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarQuestoesVestibulares = async (req, res) => {
    try {
        const questoes = await model.buscarQuestoesVestibulares();
        res.json(questoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarQuestaoPorId = async (req, res) => {
    try {
        const questao = await model.buscarQuestaoPorId(req.params.id);
        res.json(questao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const buscarFlashcards = async (req, res) => {
    try {
        const flashcards = await model.buscarFlashcards();
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listar,
    buscarPorVestibular,
    buscarPorCategoria,
    buscarPorPergunta,
    buscarTemas,
    buscarMaterialAuxiliar,
    buscarQuestoesVestibulares,
    buscarQuestaoPorId,
    buscarFlashcards
};