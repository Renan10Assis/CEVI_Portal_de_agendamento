

import Knex from 'knex';

// ao executar seeds popula a tabela Categorias com esses registros (opcional)
export async function seed(knex: Knex) {
    await knex('motoristas').insert([
        {
            mot_id: "hud-f41fd-asda1-dsa1",
            mot_sexo: "M",
            mot_nome: "Paulo Henrique",
            mot_cpf: "273.265.610-01",
            mot_nascimento: "15/02/1984",
            mot_telefone: "(11) 97854-2121",
            mot_placa: "FDW-9845",
            mot_marca: "Toyota",
            mot_modelo: "Etios",
            mot_anoModelo: "2019",
            mot_numeroViatura: "4565",
            mot_cor: "Preto",
            mot_status: "Ativo",
            
        }

    ]);    
}
