import express,{Request, Response} from 'express';
import ValidadorEmail from '../../util/ValidadorEmail';
import knex from '../connection';

class UsuariosController{
    async index(request:Request, response: Response){
        const trx = await knex.transaction()
        
        const users = await trx('usuarios').select('*');

        await trx.commit();
        return response.json(users);
    }

    async create(request:Request, response:Response){
    const emailValido = new ValidadorEmail();    
        const {
            usu_id,
            usu_nome,
            usu_email,
            usu_senha,
            usu_empresa,
            usu_tipo,
            usu_status
        } = request.body;

        if(emailValido.validaremail(usu_email)){
            const trx = await knex.transaction();

            const existeEmail = String(await trx('usuarios').select('*'))?true:false;

            if(existeEmail){
                response.json({erro: 'email já cadastrado'});
            }else{
                
            }


        }else{
            return response.json({erro: 'email inválido'});
        }



    }


}

export default UsuariosController;