import knex from './../connection';
import {Request, Response} from 'express';

class EmpresEnderecosController{
    async show(request:Request, response:Response){
        const trx = await knex.transaction();

        const{
            emp_id
        } = request.body;
        const enderecos = await trx('empresa_enderecos').where('empresaEnd_emp_id', emp_id).select('*');

        await trx.commit();

        return response.json(enderecos);
    }

    async delete(request:Request, response:Response){
        const{
            end_id
        } = request.params;

        const trx = await knex.transaction();
        let res;

        const existeID = String(await trx('enderecos').where('end_id', end_id).select('*'))?true:false;

        if(existeID){
            await trx('empresa_enderecos').where('empresaEnd_end_id', end_id).del('*');
            await trx('enderecos').where('end_id', end_id).del('*');
            res = {sucess: 'Removido com sucesso!'};
        }else{
            res = {erro: 'ID não localizado!'};
        }
        await trx.commit();

        return response.json(res);
    }
}
export default EmpresEnderecosController;