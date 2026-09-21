let repositorio = require('./repositorios/repositorio_bd.js');

function reconfig_repositorio(novo_repositorio) {
  repositorio = novo_repositorio;
}

// Compatibilidade com os testes antigos que injetam um mock de bd
function reconfig_bd(mock_bd) {
  repositorio = {
    recuperar_todas_perguntas() {
      const perguntas = mock_bd.queryAll('select * from perguntas', []);

      perguntas.forEach(pergunta => {
        const resultado = mock_bd.query(
          'select count(*) from respostas where id_pergunta = ?',
          [pergunta.id_pergunta]
        );

        pergunta.num_respostas = resultado['count(*)'];
      });

      return perguntas;
    },

    recuperar_pergunta(id_pergunta) {
      return mock_bd.query(
        'select * from perguntas where id_pergunta = ?',
        [id_pergunta]
      );
    },

    recuperar_todas_respostas(id_pergunta) {
      return mock_bd.queryAll(
        'select * from respostas where id_pergunta = ?',
        [id_pergunta]
      );
    },

    criar_pergunta(texto) {
      const result = mock_bd.exec(
        'INSERT INTO perguntas (texto, id_usuario) VALUES(?, ?) RETURNING id_pergunta',
        [texto, 1]
      );

      return result.lastInsertRowid;
    },

    criar_resposta(id_pergunta, texto) {
      const result = mock_bd.exec(
        'INSERT INTO respostas (id_pergunta, texto) VALUES(?, ?) RETURNING id_resposta',
        [id_pergunta, texto]
      );

      return result.lastInsertRowid;
    }
  };
}

function listar_perguntas() {
  return repositorio.recuperar_todas_perguntas();
}

function cadastrar_pergunta(texto) {
  return repositorio.criar_pergunta(texto);
}

function get_pergunta(id_pergunta) {
  return repositorio.recuperar_pergunta(id_pergunta);
}

function get_respostas(id_pergunta) {
  return repositorio.recuperar_todas_respostas(id_pergunta);
}

function cadastrar_resposta(id_pergunta, texto) {
  return repositorio.criar_resposta(id_pergunta, texto);
}

module.exports = {
  reconfig_repositorio,
  reconfig_bd,
  listar_perguntas,
  cadastrar_pergunta,
  get_pergunta,
  get_respostas,
  cadastrar_resposta
};