import Knex from 'knex';

// ao executar seeds popula a tabela Categorias com esses registros (opcional)
export async function seed(knex: Knex) {
    await knex('viagens').insert([
        {
            via_os: "10000001",
            via_usu_id: "3hud-41fd-a0da1-ds5da",
            via_emp_id: "hud-f41fd-asda1-dsasda",
            via_mot_id: "hud-f41fd-asda1-dsa1",
            via_nomePassageiro: "Marcelo Vaz",
            via_telPassageiro: "(11) 97845-4512",
            via_end_origem: "Av. Marco Aurélio, 271, Centro, Tietê - SP",
            via_end_destino: "Av. Jonas Felix, 1337, Centro, Tietê - SP",
            via_dataHora_solicitacao: "18/11/2020 17:32",
            via_dataHora_embarque: "20/11/2020 15:00",
            via_observacao: "Passageiro PcD",
            via_status: "Concluído"
            
        }

    ]);    
}


