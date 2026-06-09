import db from '../config/database.js';

const listar = async () => {
    const result = await db.query(`
        SELECT * FROM questoes_vestibulares
    `);

    return result.rows;
};

const buscarPorVestibular = async (vestibular) => {
    const result = await db.query(`
        SELECT *
        FROM questoes_vestibulares
        WHERE lower(vestibular) = lower($1)
    `, [vestibular]);

    return result.rows;
};

const buscarPorCategoria = async (categoria) => {
    const result = await db.query(`
        SELECT *
        FROM questoes_vestibulares
        WHERE lower(categoria) = lower($1)
    `, [categoria]);

    return result.rows;
};

const buscarPorPergunta = async (palavra) => {
    const result = await db.query(`
        SELECT *
        FROM questoes_vestibulares
        WHERE lower(pergunta)
        LIKE lower($1)
    `, [`%${palavra}%`]);

    return result.rows;
};

const buscarTemas = async (tema) => {
    const result = await db.query(`
        SELECT *
        FROM questoes_vestibulares
        WHERE lower(nomet) = lower($1)
    `, [tema]);

    return result.rows;
};

const buscarMaterialAuxiliar = async (categoria) => {
    const result = await db.query(`
        SELECT *
        FROM view_material_auxiliar
        WHERE lower(categoria) = lower($1)
    `, [categoria]);

    return result.rows;
};

const buscarQuestoesVestibulares = async () => {
    const result = await db.query(`
        select 
            q.id_questao as id,
            c.nome as categoria,
            v.nomev as vestibular,
            q.pergunta,
            a.texto_alternativa,
            a.correta,
            t.nomet
        from questoes q
        inner join categoria c
            on q.id_categoria = c.id_categoria
        inner join temas t
            on t.id_categoria = c.id_categoria
        inner join vestibulares v
            on q.id_vestibular = v.id_vestibular
        inner join alternativas a
            on q.id_questao = a.id_questao
    `);

    return result.rows;
};

const buscarQuestaoPorId = async (idQuestao) => {
    const result = await db.query(`
        select 
            q.id_questao as id,
            c.nome as categoria,
            v.nomev as vestibular,
            q.pergunta,
            a.texto_alternativa,
            a.correta,
            t.nomet
        from questoes q
        inner join categoria c
            on q.id_categoria = c.id_categoria
        inner join temas t
            on t.id_categoria = c.id_categoria
        inner join vestibulares v
            on q.id_vestibular = v.id_vestibular
        inner join alternativas a
            on q.id_questao = a.id_questao
        where q.id_questao = $1
    `, [idQuestao]);

    return result.rows;
};

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

export default {
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