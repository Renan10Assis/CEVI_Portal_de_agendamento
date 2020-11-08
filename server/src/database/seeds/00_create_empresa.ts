import Knex from 'knex';

// ao executar seeds popula a tabela Categorias com esses registros (opcional)
export async function seed(knex: Knex) {
    await knex('empresas').insert([
        {
            emp_id: "hud-f41fd-asda1-dsasda",
            emp_nomeFantasia: 'CEVI',
            emp_cnpj: "67.452.907/0001-62",
            emp_endereco: "Av. Jonas Felix, 1337, Centro, Tietê - SP"
        }

    ]);    
}