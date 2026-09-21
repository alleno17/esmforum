const Database = require('better-sqlite3');

var bd = new Database('./bd/esmforum.db');

function reconfig(nome) {
  bd = new Database(nome);
}

function query(query, params) {
  const stmt = bd.prepare(query);

  if (params === undefined) {
    return stmt.get();
  }

  return stmt.get(params);
}

function queryAll(query, params) {
  const stmt = bd.prepare(query);

  if (params === undefined) {
    return stmt.all();
  }

  return stmt.all(params);
}

function exec(statement, params) {
  const stmt = bd.prepare(statement);

  if (params === undefined) {
    return stmt.run();
  }

  return stmt.run(params);
}

exports.reconfig = reconfig;
exports.query = query;
exports.queryAll = queryAll;
exports.exec = exec;