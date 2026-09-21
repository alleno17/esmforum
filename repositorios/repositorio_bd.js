const bd = require('../bd/bd_utils.js');

function recuperar_todas_perguntas() {
  const perguntas = bd.queryAll('select * from perguntas', []);

  perguntas.forEach(pergunta => {
    pergunta['num_respostas'] = get_num_respostas(pergunta['id_pergunta']);
  });

  return perguntas;
}

function recuperar_pergunta(id_pergunta) {
  return bd.query(
    'select * from perguntas where id_pergunta = ?',
    [id_pergunta]
  );
}

function recuperar_todas_respostas(id_pergunta) {
  return bd.queryAll(
    'select * from respostas where id_pergunta = ?',
    [id_pergunta]
  );
}

function get_num_respostas(id_pergunta) {
  const resultado = bd.query(
    'select count(*) from respostas where id_pergunta = ?',
    [id_pergunta]
  );

  return resultado['count(*)'];
}

function criar_pergunta(texto) {
  const params = [texto, 1];

  const result = bd.exec(
    'INSERT INTO perguntas (texto, id_usuario) VALUES(?, ?) RETURNING id_pergunta',
    params
  );

  return result.lastInsertRowid;
}

function criar_resposta(id_pergunta, texto) {
  const params = [id_pergunta, texto];

  const result = bd.exec(
    'INSERT INTO respostas (id_pergunta, texto) VALUES(?, ?) RETURNING id_resposta',
    params
  );

  return result.lastInsertRowid;
}

module.exports = {
  recuperar_todas_perguntas,
  recuperar_pergunta,
  recuperar_todas_respostas,
  get_num_respostas,
  criar_pergunta,
  criar_resposta
};