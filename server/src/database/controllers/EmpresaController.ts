import {Request, Response}from "express";
import knex from './../connection';
import ValidadorCNPJ from './../../util/ValidadorCNPJ';

class EmpresaController{
    async index(request: Request, response:Response){
        const trx = await knex.transaction();
        const empresas = await trx('empresas').select('*');

        await trx.commit();

        return response.json(empresas);
    }
    
    async create(request:Request, response:Response){
        const{
            emp_id,
            emp_razaoSoc,
            emp_cnpj,
            emp_endereco
        } = request.body;

        const objEmp = {
            emp_id,
            emp_razaoSoc,
            emp_cnpj,
            emp_endereco
        }

        const trx = await knex.transaction();
        let res;
        const validadorCNPJ = new ValidadorCNPJ();

        if(validadorCNPJ.validarcnpj(emp_cnpj)){
            const existeCNPJ = String(await trx('empresas').where('emp_cnpj',emp_cnpj).select('*'))?true:false;
            if(existeCNPJ){
                res = {erro: 'CNPJ já cadastrado!'}
            }else{
                await trx('empresas').insert(objEmp);
                res = objEmp;
            }
        }else{
            res = {erro: 'CNPJ inválido'}
        }

        await trx.commit();

        return response.json(res);

    }

    async update(request:Request,response:Response){
        const{
            emp_id,
            emp_razaoSoc,
            emp_endereco
        } = request.body;

        const trx = await knex.transaction();
        let res;
        const existeID = String(await trx('empresas').where('emp_id', emp_id).select('*'))?true:false;

        if(existeID){
            await trx('empresas').where('emp_id', emp_id).update({
                emp_razaoSoc,
                emp_endereco
            });
            const emp = await trx('empresas').where('emp_id', emp_id).select('*');
            res = emp[0];
        }else{
            res = {erro: 'ID não localizado!'};
        }

        await trx.commit();

        return response.json(res);

    }
}

export default EmpresaController;