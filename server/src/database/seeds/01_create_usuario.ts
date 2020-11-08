import Knex from 'knex';

// ao executar seeds popula a tabela Categorias com esses registros (opcional)
export async function seed(knex: Knex) {
    await knex('usuarios').insert([
        {
            usu_id: "3hud-41fd-a0da1-ds5da",
            usu_nome: 'Renan.Assis',
            usu_email: "renan@gmail.com",
            usu_senha: "$2b$10$OFoXRdpqQbQ6Chf2UtGOdeEsd4pQfqq5Tc9y9gFR.djqQSHoAMbZS",
            usu_emp_id: "hud-f41fd-asda1-dsasda",
            usu_tipo: "Administrador",
            usu_status: "Ativo",
            usu_imagem: "http://localhost:3333/src/uploads/7b0c3214c61e3b50-PerfilRenan2.jpg"
        }

    ]);    
}
