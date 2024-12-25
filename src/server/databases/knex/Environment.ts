import { Knex } from "knex";
import path from "path";


export const development: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.join(__dirname, '..', '..', '..', '..', 'database.sqlite')
  },
  migrations: {
    directory: path.join(__dirname, '..', 'migrations')
  },
  seeds: {
    directory: path.join(__dirname, '..', 'seeds')
  },
  pool: { 
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON')
      done();
    }
  }
}

export const test: Knex.Config = {
  ...development,
  connection: ':memory:'

}

export const production: Knex.Config = {
  ...development
}
