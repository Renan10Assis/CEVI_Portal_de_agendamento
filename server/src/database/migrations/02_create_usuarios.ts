import Knex from "knex";

// criando tabela e seus atributos
export async function up(knex: Knex){
    return knex.schema.createTable('usuarios', table => {
        table.string('usu_id').unique().notNullable();//deixei a chave primaria em string pois usei a biblioteca uuid no front-end
        table.string('usu_nome').notNullable();
        table.string('usu_email').unique().notNullable();
        table.string('usu_senha').notNullable();
        table.string('usu_emp_id').notNullable().references('emp_id').inTable('empresas');
        table.string('usu_tipo').notNullable();
        table.string('usu_status').notNullable();

    });
}

// essa função é chamada caso algo dê errado na criação da tabela, vontando atrás, ou seja excluindo a tabela.
export async function down(knex: Knex){
    return knex.schema.dropTable('usuarios');
}