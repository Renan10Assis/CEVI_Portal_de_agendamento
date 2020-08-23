import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('empresas', table =>{
        table.string('emp_id').unique().notNullable();
        table.string('emp_razaoSoc').unique().notNullable();
        table.string('emp_cnpj').unique().notNullable();
        table.string('emp_end_id').notNullable().references('end_id').inTable('enderecos');
        table.integer('emp_end_favoritos');

    });

}

export async function down(knex:Knex){
    return knex.schema.dropTable('empresas');
}