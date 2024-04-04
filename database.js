import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

// Abra o banco de dados
const db = SQLite.openDatabase({ name: 'appbd.db' });

console.log('Tentando abrir o banco de dados...');

export default db;