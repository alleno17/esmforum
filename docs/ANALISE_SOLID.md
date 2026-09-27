# Análise dos Princípios SOLID: ESM Forum

# Introdução

O ESM Forum tem uma arquitetura simples, baseada majoritariamente em uma variação do padrão MVC. O frontend existe como uma camada de visão, já o arquivo `server.js` assume o papel de controlador e o arquivo `modelo.js` concentra as operações relacionadas as perguntas e respostas.

A partir da análise do código atual, é possível identificar certas decisões que favorecem os princípios SOLID, mas também há pontos que podem ser aprimorados.

# 1. Exemplo positivo: Separação entre Controlador e Modelo

Um de seus pontos positivos é a separação entre o tratamento das requisições HTTP e as operações do sistema.

No `server.js`, por exemplo, a rota responsável pelo cadastro de perguntas não executa diretamente comandos SQL:

```javascript
app.post('/perguntas', (req, res) => {
  try {
    const id_pergunta = modelo.cadastrar_pergunta(req.body.pergunta);
    res.json({id_pergunta: id_pergunta});
  }
  catch(erro) {
    res.status(500).json(erro.message);
  }
});
```

A rota recebe a requisição e delega a operação para `modelo.cadastrar_pergunta()`.

Essa divisão contribui bastante para o SRP, pois o controlador fica majoritariamente responsável pela comunicação HTTP, enquanto as operações relacionadas aos dados são deixadas ao modelo.

# 2. Exemplo positivo: Isolamento do acesso ao SQLite

O projeto possui o arquivo `bd_utils.js`, encarregado de encapsular operações básicas de acesso ao banco.

```javascript
function query(query, params) {
  return bd.prepare(query).get(params);
}

function queryAll(query, params) {
  return bd.prepare(query).all(params);
}

function exec(statement, params) {
  return bd.prepare(statement).run(params);
}
```

Isso evita que detalhes específicos da biblioteca `better-sqlite3` sejam repetidos em todas as partes do sistema.

Essa separação melhora muito a organização do código e concentra grande parte da responsabilidade de comunicação direta com o banco em um único módulo.


# 3. Exemplo positivo: Possibilita a substituição de dependência do banco em testes

O arquivo `modelo.js` tem a função:

```javascript
function reconfig_bd(mock_bd) {
  bd = mock_bd;
}
```

Tal função possibilita substituir o módulo de banco por uma implementação simulada durante os testes.

Isso reduz o acoplamento durante a execução dos testes e possibilita a facilitação dos testes de operações sem depender diretamente do banco SQLite real.

A ideia é bastante próxima do princípio DIP (Dependency Inversion Principle), pois ela permite que uma dependência utilizada pelo modelo seja substituída.


# Violações e pontos de melhoria

# 4. Violação: Modelo também contém comandos SQL

Apesar de existir `bd_utils.js`, o arquivo `modelo.js` ainda conhece diretamente os comandos SQL.

Exemplo:

```javascript
function cadastrar_pergunta(texto) {
  const params = [texto, 1];
  const result = bd.exec(
    'INSERT INTO perguntas (texto, id_usuario) VALUES(?, ?) RETURNING id_pergunta',
    params
  );
  return result.lastInsertRowid;
}
```

Também existem consultas SQL em funções como:

```javascript
function get_pergunta(id_pergunta) {
  return bd.query(
    'select * from perguntas where id_pergunta = ?',
    [id_pergunta]
  );
}
```

Então, o modelo junta duas preocupações: operações do domínio do fórum e conhecimento sobre a persistência dos dados.

Uma melhoria seria criar uma camada de repositório:

```text
Controlador
     |
     v
   Modelo
     |
     v
 Repositório
     |
     v
 Banco de Dados
```

O repositório ficaria responsável pelos comandos SQL, enquanto o modelo trabalharia com operações de nível mais alto.

Isso melhoraria majoritariamente a separação de responsabilidades e diminuiria o acoplamento entre o modelo e a persistência.


# 5. Violação: Dependência direta de uma implementação concreta

No início de `modelo.js`, há uma  dependência direta:

```javascript
var bd = require('./bd/bd_utils.js');
```

Isso faz com que o modelo saiba diretamente sobre o módulo utilizado para acessar o banco.

Embora `reconfig_bd()` permita substituir essa dependência durante testes, uma solução mais organizada seria fazer o modelo depender de uma abstração de repositório.

Exemplo:

```text
RepositorioBD
RepositorioMemoria
```

Os dois ofereceriam operações equivalentes, como:

```javascript
recuperar_todas_perguntas();
recuperar_pergunta(id_pergunta);
recuperar_todas_respostas(id_pergunta);
recuperar_num_respostas(id_pergunta);
criar_pergunta(texto);
criar_resposta(id_pergunta, texto);
```

`RepositorioBD` trabalharia com SQLite, enquanto `RepositorioMemoria` armazenaria dados em memória durante os testes.

Essa alteração aproximaria a arquitetura do DIP, pois o modelo não precisaria ficar diretamente associado aos detalhes do SQLite.

# Análise dos cinco princípios SOLID

# SRP: Single Responsibility Principle

No projeto existem separações de responsabilidades, principalmente entre `server.js`, `modelo.js` e `bd_utils.js`.

Porém, o modelo ainda mistura operações do sistema com comandos SQL. A criação de uma camada de repositório deixaria essa separação mais clara.

# OCP: Open/Closed Principle

A estrutura atual possui poucas abstrações para permitir novas formas de persistência sem alterar o código existente.

Com uma camada de repositórios, seria possível adicionar outras implementações de armazenamento com menos alterações no modelo.

# LSP: Liskov Substitution Principle

O código atual não possui uma hierarquia significativa de classes ou tipos que permita observar uma aplicação clara do LSP.

Caso sejam criados diferentes repositórios com o mesmo contrato, eles deverão poder ser substituídos sem alterar o comportamento esperado pelo modelo.

# ISP: Interface Segregation Principle

O projeto não define interfaces formais para os seus componentes.

Com a criação da camada de repositórios, o contrato deve conter apenas as operações realmente necessárias para o modelo, evitando dependências desnecessárias.

# DIP: Dependency Inversion Principle

Existe uma tentativa de reduzir o acoplamento através de `reconfig_bd()`, que permite trocar a dependência usada nos testes.

Porém, o modelo ainda depende diretamente de `bd_utils.js`. A criação de uma abstração de repositório permitiria separar melhor a lógica do sistema dos detalhes de persistência.


# Refatoração proposta

A principal refatoração proposta é adicionar uma camada de repositórios.

A arquitetura passaria de:

```text
Frontend
   |
server.js
   |
modelo.js
   |
bd_utils.js
   |
SQLite
```

para:

```text
Frontend
   |
server.js
   |
modelo.js
   |
Repositório
   |
   +-------------------+
   |                   |
RepositorioBD    RepositorioMemoria
   |                   |
 SQLite              Memória
```

O `RepositorioBD` ficaria responsável pelas consultas SQL utilizadas na aplicação.

O `RepositorioMemoria` poderia ser utilizado nos testes, permitindo executar testes de unidade sem acessar o banco de dados real.

A função:

```javascript
reconfig_bd()
```

poderia então ser substituída por:

```javascript
reconfig_repositorio()
```

permitindo configurar qual implementação de repositório será utilizada pelo modelo.

# Final

O ESM Forum já possui uma divisão básica entre interface, controlador, modelo e acesso ao banco, o que facilita a compreensão do sistema.

Entretanto, a análise mostra que o `modelo.js` ainda possui dependência dos detalhes de persistência e contém comandos SQL. A criação de uma camada de repositório permitiria separar melhor essas responsabilidades.

Essa mudança também facilitaria os testes, pois seria possível substituir o repositório que acessa SQLite por uma implementação em memória.

Assim, a aplicação dos princípios SOLID pode tornar a estrutura do ESM Forum mais modular, testável e mais simples de modificar futuramente.