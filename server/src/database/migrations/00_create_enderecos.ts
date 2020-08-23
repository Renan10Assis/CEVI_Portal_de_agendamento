import Knex from 'knex';

export async function up(knex:Knex){
    return knex.schema.createTable('enderecos', table =>{
        table.string('end_id').unique().notNullable();
        table.string('end_cep').notNullable();
        table.string('end_logradouro').notNullable();
        table.string('end_numero').notNullable();
        table.string('end_bairro').notNullable();
        table.string('end_uf').notNullable();
        table.string('end_cidade').notNullable();
        table.decimal('end_longitude').notNullable();
        table.decimal('end_latitude').notNullable();

    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable('enderecos');
}