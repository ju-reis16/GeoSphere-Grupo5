const express = require('express');
const controller = require('../controllers/questoesVestibularesController');

const router = express.Router();

router.get('/', controller.listar);
router.get('/vestibular/:vestibular', controller.buscarPorVestibular);
router.get('/categoria/:categoria', controller.buscarPorCategoria);
router.get('/questao/:palavra', controller.buscarPorPergunta);
router.get('/tema/:tema', controller.buscarTemas);
router.get('/material-auxiliar/:categoria', controller.buscarMaterialAuxiliar);
router.get('/questoes-vestibulares', controller.buscarQuestoesVestibulares);
router.get('/questoes/:id', controller.buscarQuestaoPorId);
router.get('/view-flashcards', controller.buscarFlashcards);

module.exports = router;