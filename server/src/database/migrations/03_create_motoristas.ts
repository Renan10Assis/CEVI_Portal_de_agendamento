import Knex from 'knex';

export async function up(knex:Knex){
    return knex.schema.createTable('motoristas', table=>{
        table.string('mot_id').unique().notNullable();
        table.string('mot_sexo').notNullable();
        table.string('mot_nome').notNullable();
        table.string('mot_cpf').notNullable();
        table.string('mot_nascimento').notNullable();
        table.string('mot_telefone').notNullable();
        table.string('mot_placa').unique().notNullable();
        table.string('mot_modelo').notNullable();
        table.string('mot_anoModelo').notNullable();
        table.string('mot_numeroViatura').notNullable();
        table.string('mot_cor').notNullable();
        table.string('mot_status').notNullable();
    });
}

export async function down(knex:Knex){
    return knex.schema.dropTable('motoristas');
}