const db = require('../config/database');

const listar = async () => {
    const result = await db.query(`SELECT * FROM questoes_vestibulares`);
    return result.rows;
};

// Função para buscar questões por vestibular, categoria, palavra-chave na pergunta e temas
const buscarPorVestibular = async (vestibular) => {
    const result = await db.query(`
        SELECT * FROM questoes_vestibulares
        WHERE lower(vestibular) = lower($1)
    `, [vestibular]);
    return result.rows;
};

const buscarPorCategoria = async (categoria) => {
    const result = await db.query(`
        SELECT * FROM questoes_vestibulares
        WHERE lower(categoria) = lower($1)
    `, [categoria]);
    return result.rows;
};

const buscarPorPergunta = async (palavra) => {
    const result = await db.query(`
        SELECT * FROM questoes_vestibulares
        WHERE lower(pergunta) LIKE lower($1)
    `, [`%${palavra}%`]);
    return result.rows;
};

const buscarTemas = async (tema) => {
    const result = await db.query(`
        SELECT * FROM questoes_vestibulares
        WHERE lower(nomet) = lower($1)
    `, [tema]);
    return result.rows;
};

const buscarMaterialAuxiliar = async (categoria) => {
    const result = await db.query(`
        SELECT * FROM view_material_auxiliar
        WHERE lower(categoria) = lower($1)
    `, [categoria]);
    return result.rows;
};

//' Função para buscar questões agrupadas por ID, com alternativas e resposta correta

const buscarQuestoesVestibulares = async () => {
    const result = await db.query(`
      SELECT
    q.id_questao AS id,
    c.nome        AS categoria,
    v.nomev       AS vestibular,
    q.pergunta,
    q.comentario,
    a.texto_alternativa,
    a.correta
FROM questoes q
INNER JOIN categoria    c ON q.id_categoria  = c.id_categoria
INNER JOIN vestibulares v ON q.id_vestibular = v.id_vestibular
INNER JOIN alternativas a ON q.id_questao    = a.id_questao;
    `);
    return result.rows;
};

const buscarQuestaoPorId = async (idQuestao) => { 
    const result = await db.query(`
       SELECT
    q.id_questao AS id,
    c.nome        AS categoria,
    v.nomev       AS vestibular,
    q.pergunta,
    q.comentario,
    a.texto_alternativa,
    a.correta
FROM questoes q
INNER JOIN categoria    c ON q.id_categoria  = c.id_categoria
INNER JOIN vestibulares v ON q.id_vestibular = v.id_vestibular
INNER JOIN alternativas a ON q.id_questao    = a.id_questao
        WHERE q.id_questao = $1
    `, [idQuestao]);
    return result.rows;
};

// Função para buscar flashcards agrupados por categoria

const buscarFlashcards = async () => {
    const result = await db.query(`
        select 
            f.pergunta,
            f.resposta,
            c.nome,
            c.id_categoria
        from flashcards f
            inner join categoria c
            on f.id_categoria = c.id_categoria
    `);
    return result.rows;
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