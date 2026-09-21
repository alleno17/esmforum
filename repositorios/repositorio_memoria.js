let perguntas = [];
let respostas = [];
let proximoIdPergunta = 1;
let proximoIdResposta = 1;

function recuperar_todas_perguntas() {
  return perguntas.map(pergunta => ({
    ...pergunta,
    num_respostas: respostas.filter(
      resposta => resposta.id_pergunta === pergunta.id_pergunta
    ).length
  }));
}

function recuperar_pergunta(id_pergunta) {
  return perguntas.find(
    pergunta => pergunta.id_pergunta == id_pergunta
  );
}

function recuperar_todas_respostas(id_pergunta) {
  return respostas.filter(
    resposta => resposta.id_pergunta == id_pergunta
  );
}

function criar_pergunta(texto) {
  const pergunta = {
    id_pergunta: proximoIdPergunta++,
    texto: texto,
    id_usuario: 1
  };

  perguntas.push(pergunta);

  return pergunta.id_pergunta;
}

function criar_resposta(id_pergunta, texto) {
  const resposta = {
    id_resposta: proximoIdResposta++,
    texto: texto,
    id_pergunta: Number(id_pergunta),
    id_usuario: 1
  };

  respostas.push(resposta);

  return resposta.id_resposta;
}

module.exports = {
  recuperar_todas_perguntas,
  recuperar_pergunta,
  recuperar_todas_respostas,
  criar_pergunta,
  criar_resposta
};