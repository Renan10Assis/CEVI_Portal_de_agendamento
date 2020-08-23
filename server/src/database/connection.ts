import knex from 'knex';

//Este arquivo cria a conexao com o banco de dados
//Os controllers importam a conexao deste arquivo para realizar as operações no banco de dados
const connection = knex({
    client: 'pg',
    connection: {
        database: 'dbprojeto',
        user: 'postgres',
        password: '0000'
    },
    useNullAsDefault:true,

});

export default connection;