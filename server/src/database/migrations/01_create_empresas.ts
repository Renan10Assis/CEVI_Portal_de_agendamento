import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('empresas', table =>{
        table.string('emp_id').unique().notNullable();
        table.string('emp_nomeFantasia').unique().notNullable();
        table.string('emp_cnpj').unique().notNullable();
        table.string('emp_endereco').notNullable();

    });

}

export async function down(knex:Knex){
    return knex.schema.dropTable('empresas');
}