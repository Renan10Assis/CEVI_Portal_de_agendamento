import Knex from 'knex';

export async function up(knex:Knex){
    return knex.schema.createTable('empresa_enderecos', table =>{
        table.increments('empresaEnd_id').primary();
        table.string('empresaEnd_emp_id').notNullable().references('emp_id').inTable('empresas');
        table.string('empresaEnd_end_id').notNullable().references('end_id').inTable('enderecos');

    })//.raw('ALTER TABLE viagens AUTO_INCREMENT = 1000000000');
}

export async function down(knex:Knex){
    return knex.schema.dropTable('empresa_enderecos');
}