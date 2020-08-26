import Knex from 'knex';

export async function up(knex:Knex){
    return knex.schema.createTable('viagens', table =>{
        table.increments('via_OS').primary();
        table.string('via_usu_id').notNullable().references('usu_id').inTable('usuarios');
        table.string('via_emp_id').notNullable().references('emp_id').inTable('empresas');
        table.string('via_mot_id').notNullable().references('mot_id').inTable('motoristas');
        table.string('via_telPassageiro').notNullable();
        table.string('via_end_origem_id').notNullable().references('end_id').inTable('enderecos');
        table.string('via_end_destino_id').notNullable().references('end_id').inTable('enderecos');
        table.string('via_dataHora_solicitacao').notNullable();
        table.string('via_dataHora_embarque').notNullable();
        table.string('via_observacao').notNullable();
        table.string('via_status').notNullable();

    })//.raw('ALTER TABLE viagens AUTO_INCREMENT = 1000000000');
}

export async function down(knex:Knex){
    return knex.schema.dropTable('viagens');
}