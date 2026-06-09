import model from '../models/questoesVestibularesModel.js';
const listar = async (req, res) => {
    try {
        const dados = await model.listar();
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarPorVestibular = async (req, res) => {
    try {
        const dados = await model.buscarPorVestibular(
            req.params.vestibular
        );

        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarPorCategoria = async (req, res) => {
    try {
        const dados = await model.buscarPorCategoria(
            req.params.categoria
        );

        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarPorPergunta = async (req, res) => {
    try {
        const dados = await model.buscarPorPergunta(
            req.params.palavra
        );

        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarTemas = async (req, res) => {
    try {
        const dados = await model.buscarTemas(
            req.params.tema
        );

        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarMaterialAuxiliar = async (req, res) => {
    try {
        const dados = await model.buscarMaterialAuxiliar(
            req.params.categoria
        );

        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarQuestoesVestibulares = async (req, res) => {
    try {
        const dados = await model.buscarQuestoesVestibulares();
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarQuestaoPorId = async (req, res) => {
    try {
        const dados = await model.buscarQuestaoPorId(req.params.id);
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarFlashcards = async (req, res) => {
    try {
        const dados = await model.buscarFlashcards();
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export {
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