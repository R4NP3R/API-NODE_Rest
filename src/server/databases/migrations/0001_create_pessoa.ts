import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ETableNames.pessoa, table => {
    table.bigIncrements('id').primary().index(),
    table.string('nomeCompleto').index().notNullable(),
    table.string('email').unique().notNullable(),

    table
      .bigInteger('cidadeId')
      .index()
      .notNullable()
      .references('id')
      .inTable(ETableNames.cidade)
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

    table.comment('Tabela de pessoas')
  }).then(() => {
    console.log(`# Created Table ${ETableNames.pessoa}`)
  }
)
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.pessoa)
  .then(() => {
      console.log(`# Deleted Table ${ETableNames.pessoa}`)
    }
  )

}

