import { Request, Response } from "express";
import knex from "./../connection";

class EnderecoController {

    async index(request: Request, response: Response) {
        const trx = await knex.transaction();
        const enderecos = await trx('enderecos').select('*');

        await trx.commit();

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

        await trx.commit();


        return response.json();
    }


/*     async delete(request:Request, response:Response){
        const{
            end_id
        } = request.params;
        const trx = await knex.transaction();
        let res;
        const existeEnd = String(await trx('empresa_enderecos').where('empresaEnd_end_id', end_id))?true:false;

        if(existeEnd){
            await trx('empresa_enderecos').where('empresaEnd_end_id', end_id).del('*')
            await trx('enderecos').where('end_id', end_id).del('*');
            res = {sucess: 'Excluído com sucesso!'};
        }else{
            res = {erro: 'ID não encontrado'};
        }

        return response.json(res);

    } */

}

export default EnderecoController;

