import knex from "./../connection";
import { Request, Response } from 'express';

class MotoristaController {
    async index(request: Request, response: Response) {
        const trx = await knex.transaction();
        const motoristas = await trx('motoristas').select('*');

        await trx.commit();

        return response.json(motoristas);

    }

    async create(request: Request, response: Response) {
        const {
            mot_id,
            mot_nome,
            mot_sexo,
            mot_cpf,
            mot_nascimento,
            mot_telefone,
            mot_placa,
            mot_modelo,
            mot_anoModelo,
            mot_numeroViatura,
            mot_cor,
            mot_status
        } = request.body;

        const objMotorista = {
            mot_id,
            mot_nome,
            mot_nascimento,
            mot_sexo,
            mot_cpf,
            mot_telefone,
            mot_placa,
            mot_modelo,
            mot_anoModelo,
            mot_numeroViatura,
            mot_cor,
            mot_status
        };
        const trx = await knex.transaction();
        let res;
        const existeMot = String(await trx('motoristas').where('mot_cpf', mot_cpf).select('*'))? true:false;

        if(existeMot){
            res = {erro: 'Motorista já cadastrado'}
        }else{
            await trx('motoristas').insert(objMotorista);
            const mot = await trx('motoristas').where('mot_id', mot_id).select('*');
            res = mot[0];
        }
        await trx.commit();

        return response.json(res);

    }

    async update(request:Request, response:Response){
        const{
            mot_id,
            mot_nome,
            mot_telefone,
            mot_placa,
            mot_modelo,
            mot_anoModelo,
            mot_numeroViatura,
            mot_cor,
            mot_status
        } = request.body;

        const objMotorista = {
            mot_nome,
            mot_telefone,
            mot_placa,
            mot_modelo,
            mot_anoModelo,
            mot_numeroViatura,
            mot_cor,
            mot_status
        }

        const trx = await knex.transaction();
        let res;

        const existeID = String(await trx('motoristas').where('mot_id', mot_id).select('*'))? true:false;

        if(existeID){
            await trx('motoristas').where('mot_id', mot_id).update(objMotorista);
            const mot = await trx('motoristas').where('mot_id', mot_id).select('*');
            res = mot[0];
        }else{
            res = {erro: 'ID não localizado!'};
        }

        await trx.commit();

        return response.json(res);

    }

}

export default MotoristaController;
