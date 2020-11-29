import knex from './../connection';
import { Request, Response, request, response } from 'express';

/* table.increments('via_os').primary();
table.string('via_usu_id').notNullable().references('usu_id').inTable('usuarios');
table.string('via_emp_id').notNullable().references('emp_id').inTable('empresas');
table.string('via_mot_id').references('mot_id').inTable('motoristas');
table.string('via_nomePassageiro').notNullable();
table.string('via_telPassageiro').notNullable();
table.string('via_end_origem');
table.string('via_end_destino');
table.string('via_dataHora_solicitacao').notNullable();
table.string('via_dataHora_embarque').notNullable();
table.string('via_observacao').notNullable();
table.string('via_status').notNullable(); */


class ViagemController {
    async index(request: Request, response: Response) {

        const trx = await knex.transaction();
       
        let viagens = await trx('viagens as v')
        .join('empresas as empSol', 'empSol.emp_id', 'userSol.usu_emp_id')
        .join('empresas as empVia', 'empVia.emp_id', 'v.via_emp_id')
        .join('usuarios as userSol', 'userSol.usu_id', 'v.via_usu_id')
        .select(
        'v.via_os',
        'v.via_mot_id',
        'v.via_nomePassageiro',
        'v.via_telPassageiro',
        'v.via_end_origem',
        'v.via_end_destino',
        'v.via_dataHora_solicitacao',
        'v.via_dataHora_embarque',
        'v.via_observacao',
        'v.via_status',
        'userSol.usu_nome as solicitante',
        'empSol.emp_nomeFantasia as empresa_viagem',
        'empVia.emp_nomeFantasia as empresa_solicitante'
        
        
        );
        
   
        
        //.orderBy("via_dataHora_embarque", "desc");

            
        await trx.commit().catch(err => (console.log(err)));

        return response.json(viagens);
    }

    async show(request: Request, response: Response) {
        const { emp_id } = request.params;

        const trx = await knex.transaction();

        const viagens = await trx('viagens')
            .where('via_emp_id', emp_id)
            .select('*')
            .orderBy('via_dataHora_embarque', 'desc');

        await trx.commit().catch(err => (console.log(err)));

        return response.json(viagens);

    }

    async create(request: Request, response: Response) {
        const {
            via_usu_id,
            via_emp_id,
            via_mot_id,
            via_nomePassageiro,
            via_telPassageiro,
            via_end_origem,
            via_end_destino,
            via_dataHora_solicitacao,
            via_dataHora_embarque,
            via_observacao,
            via_status
        } = request.body;

        const objViagem = {
            via_usu_id,
            via_emp_id,
            via_mot_id: via_mot_id === undefined || via_mot_id === null ? "" : via_mot_id,
            via_nomePassageiro,
            via_telPassageiro,
            via_end_origem,
            via_end_destino,
            via_dataHora_solicitacao,
            via_dataHora_embarque,
            via_observacao,
            via_status
        };

        const trx = await knex.transaction();
        let res;

        const insertedViagem = await trx('viagens').insert(objViagem);

        if (String(insertedViagem[0])) {
            res = await trx('viagens')
                .where('via_os', insertedViagem[0])
                .select('*');
        } else {
            res = { erro: 'Falha ao solicitar viagem!' }
        }
        await trx.commit().catch(err => (console.log(err)));

        return response.json(res);
    }

    async updateMotoristaViagem(request: Request, response: Response) {
        const {
            via_os,
            via_mot_id
        } = request.body;

	const data={	
	    via_os: Number(via_os),
	    via_mot_id: String(via_mot_id)
	}
	
        const trx = await knex.transaction();
        let res;
        const existeViagem = String(await trx('viagens').where('via_os', via_os).select('*')) ? true : false;

        if (existeViagem) {
            await trx('viagens').where('via_os', via_os).update({ via_mot_id });
            res = { success: 'Motorista atribuído com sucesso!' };
        } else {
            res = { erro: 'OS não localizado!' };
        }

        await trx.commit();

        return response.json(res);
    }

    async updateStatusViagem(request: Request, response: Response) {
        const {
            via_os,
            via_status
        } = request.body;

        const trx = await knex.transaction();
        let res;
        const existeViagem = String(await trx('viagens').where('via_os', via_os).select('*')) ? true : false;
        if (existeViagem) {
            await trx('viagens').where('via_os', via_os).update({ via_status });
            res = { success: 'Status atualizados com sucesso!' };
        } else {
            res = { erro: 'OS não localizado!' };
        }

        await trx.commit().catch(err => (console.log(err)));

        return response.json(res);
    }
}

export default ViagemController;

