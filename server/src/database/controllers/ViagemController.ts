import knex from './../connection';
import {Request, Response, request, response} from 'express';

class ViagemController{
    async index(response:Response){
        const trx = await knex.transaction();
        const viagens = await trx('viagens').select("*");

        await trx.commit();

        return response.json(viagens);
    }

    async show(request:Request, response:Response){
        const{emp_id} = request.params;

        const trx = await knex.transaction();

        const viagens = await trx('viagens').where('via_emp_id', emp_id).select('*');

        await trx.commit();

        return response.json(viagens);

    }

    async create(request:Request, response:Response){
        const{
            via_usu_id,
            via_emp_id,
            via_mot_id,
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
            via_mot_id: via_mot_id === undefined || via_mot_id === null? "":via_mot_id,
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
        if(String(insertedViagem[0])){
            res = await trx('viagens').where('via_os',insertedViagem[0]).select('*');
        }else{
            res = {erro: 'Falha ao solicitar viagem!'}
        }
        await trx.commit();

        return response.json(res);
    }

    async updateMotoristaViagem(){
        const{
            via_os,
            via_mot_id
        } = request.body;

        const trx = await knex.transaction();
        let res;
        const existeViagem = String(await trx('viagens').where('via_os', via_os).select('*'))?true:false;
        if(existeViagem){
            await trx('viagens').where('via_os',via_os).update({via_mot_id});
            res = {success: 'Motorista associado com sucesso!'};
        }else{
            res = {erro: 'OS não localizado!'};
        }

        await trx.commit();

        return response.json(res);
    }

    async updateStatusViagem(){
        const{
            via_os,
            via_status
        } = request.body;

        const trx = await knex.transaction();
        let res;
        const existeViagem = String(await trx('viagens').where('via_os', via_os).select('*'))?true:false;
        if(existeViagem){
            await trx('viagens').where('via_os',via_os).update({via_status});
            res = {success: 'Status atualizados com sucesso!'};
        }else{
            res = {erro: 'OS não localizado!'};
        }

        await trx.commit();
        
        return response.json(res);
    }
}

export default ViagemController;

