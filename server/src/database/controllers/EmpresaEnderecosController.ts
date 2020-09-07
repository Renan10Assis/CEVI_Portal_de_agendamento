import knex from './../connection';
import {Request, Response} from 'express';

class EmpresEnderecosController{
    async index(request: Request, response: Response) {
        const trx = await knex.transaction();
        const enderecos = await trx('enderecos').select('*');

        await trx.commit().catch(err=>(console.log(err)));

        return response.json(enderecos);
    }


    
    async show(request:Request, response:Response){
        const trx = await knex.transaction();

        const{
            emp_id
        } = request.params;
        const enderecos = await trx('empresa_enderecos')
        .join('enderecos', 'end_id','empresaEnd_end_id')
        .where('empresaEnd_emp_id', emp_id).select('*');

        await trx.commit().catch(err=>(console.log(err)));

        return response.json(enderecos);
    }


    async create(request: Request, response: Response) {
        const {
            emp_id,
            end_id,
            end_cep,
            end_logradouro,
            end_bairro,
            end_numero,
            end_uf,
            end_cidade,
            end_longitude,
            end_latitude
        } = request.body;

        const objEndereco = {
            end_id,
            end_cep,
            end_logradouro,
            end_bairro,
            end_numero,
            end_uf,
            end_cidade,
            end_longitude,
            end_latitude
        }

        const trx = await knex.transaction();

        await trx('enderecos').insert(objEndereco);

        //Salvando o endereco favorito da empresa

        await trx('empresa_enderecos').insert({
            empresaEnd_emp_id: String(emp_id),
            empresaEnd_end_id: String(end_id),
        });

        await trx.commit().catch(err=>(console.log(err)));


        return response.json({success: 'Endereço salvo com sucesso!'});
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
        await trx.commit().catch(err=>(console.log(err)));

        return response.json(res);
    }
}
export default EmpresEnderecosController;