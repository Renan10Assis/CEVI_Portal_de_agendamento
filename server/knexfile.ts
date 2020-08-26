import path from 'path';


module.exports = {

    client: 'sqlite',
    connection:{
        filename:  path.resolve(__dirname,'src','database','database.sqlite')
    },
    //cria a conexao com o banco de dados
/*     client: 'pg',
    connection:{
        database: 'dbprojeto',
        user: 'postgres',
        password: '0000'
        
    }, */
    //cria as tabelas executando as migrations
    migrations: {
        directory: path.resolve(__dirname,'src','database','migrations')
    },
    //insere dados predefinidos nas tabelas(opcional)
    seeds: {
        directory: path.resolve(__dirname,'src','database','seeds')
    },
    useNullAsDefault:true,

};