import db from './database';

export const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)',
        [],
        () => {
          console.log('Tabela criada com sucesso');
          resolve();
        },
        error => {
          console.error('Erro ao criar tabela:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertUser = (name, age) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, age) VALUES (?, ?)',
        [name, age],
        (_, result) => {
          console.log('Inserção bem-sucedida');
          resolve(result);
        },
        error => {
          console.error('Erro ao inserir dados:', error);
          reject(error);
        }
      );
    });
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (_, { rows }) => {
          console.log('Resultados da consulta:', rows.raw());
          resolve(rows.raw());
        },
        error => {
          console.error('Erro ao consultar dados:', error);
          reject(error);
        }
      );
    });
  });
};
