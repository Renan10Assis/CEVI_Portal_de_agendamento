import { Request, Response } from 'express';
import fs from 'fs';
import ValidadorEmail from '../../util/ValidadorEmail';
import knex from '../connection';
import bcrypt from "bcrypt";

class UsuariosController {
    async index(request: Request, response: Response) {
        const trx = await knex.transaction()

        const users = await trx('usuarios')
            .join('empresas', 'emp_id', 'usu_emp_id')
            .select('*')
            .orderBy('usu_nome');

        await trx.commit().catch(err => (console.log(err)));
        return response.json(users);
    }

    async create(request: Request, response: Response) {
        const emailValido = new ValidadorEmail();
        const saltRounds = 10;

        const {
            usu_id,
            usu_nome,
            usu_email,
            usu_senha,
            usu_emp_id,
            usu_tipo,
            usu_status,
        } = request.body;

        const userOBJ = {
            usu_id,
            usu_nome,
            usu_email,
            usu_senha: await bcrypt.hash(String(usu_senha), saltRounds),
            usu_emp_id,
            usu_tipo,
            usu_status,
        };

        if (emailValido.validaremail(usu_email)) {
            const trx = await knex.transaction();
            let resposta;
            const existe = String(await trx('usuarios').where('usu_email', usu_email).select('*')) || String(await trx('usuarios').where('usu_nome', usu_nome).select('*')) ? true : false;

            if (existe) {
                resposta = { erro: 'Usuário ou email já cadastrado' };
            } else {
                await trx('usuarios').insert(userOBJ);
                resposta = userOBJ;
            }
            await trx.commit().catch(err => (console.log(err)));
            return response.json(resposta);

        } else {
            return response.json({ erro: 'email inválido' });
        }

    }

    async update(request: Request, response: Response) {
        const {
            usu_id,
            usu_nome,
            usu_emp_id,
            usu_tipo,
            usu_status
        } = request.body;

        const userOBJ = {
            usu_nome,
            usu_emp_id,
            usu_tipo,
            usu_status
        };
        const trx = await knex.transaction();
        let resposta;
        const existeID = String(await trx('usuarios').where('usu_id', String(usu_id)).select("*")) ? true : false;
        if (existeID) {
            const isUpdateSuccessful = await trx('usuarios').where('usu_id', String(usu_id)).update(userOBJ);

            if (isUpdateSuccessful) {

                const updatedUser = await trx('usuarios').where('usu_id', usu_id).select('*');
                resposta = updatedUser[0];
            } else {
                resposta = { erro: "erro ao atualizar campos!" }
            }
        } else {
            resposta = { erro: "ID não localizado." }
        }
        await trx.commit().catch(err => (console.log(err)));

        return response.json(resposta);


    }

    async delete(request: Request, response: Response) {
        const {
            usu_id
        } = request.params;

        const trx = await knex.transaction();
        let resposta;
        let user = await trx('usuarios').where('usu_id', String(usu_id)).select('*');


        if (String(user)) {
            await trx('usuarios').where('usu_id', String(usu_id)).del('*');
            resposta = user[0];
        } else {
            resposta = { erro: 'ID não localizado.' }
        }
        await trx.commit().catch(err => (console.log(err)));

        return response.json(resposta);

    }
    async updateProfileImage(request: Request, response: Response) {
        const trx = await knex.transaction();
        const usu_imagem = `http://localhost:3333/src/uploads/${request.file.filename}`;
        const { usu_id } = request.body;

        let imgAntiga = await trx('usuarios').where('usu_id', usu_id).select('usu_imagem');
        imgAntiga = imgAntiga[0].usu_imagem.replace('http://localhost:3333/src/uploads/', '');
        if (imgAntiga) {
            fs.stat(`./src/uploads/${imgAntiga}`, function (err, stats) {
                console.log(stats);//informacao do arquivo

                err ?
                    console.error(err)
                    :
                    fs.unlink(`./src/uploads/${imgAntiga}`, function (err) {
                        if (err) return console.log(err);
                        console.log('Imagem substituída com sucesso!');
                    });
            });

        }

        await trx('usuarios').where('usu_id', usu_id).update({ usu_imagem });

        await trx.commit().catch(err => (console.log(err)));


        return response.json({ success: 'Imagem de perfil atualizada com sucesso!' });
    }

    async updateEmail(request: Request, response: Response) {
        const {
            usu_emailAntigo,
            usu_emailNovo
        } = request.body;

        const validadorEmail = new ValidadorEmail();
        let resposta;
        const trx = await knex.transaction();

        if (validadorEmail.validaremail(String(usu_emailNovo)) && validadorEmail.validaremail(usu_emailAntigo)) {
            const emailAntigoExiste = String(await trx('usuarios').where('usu_email', String(usu_emailAntigo)).select('*')) ? true : false;
            if (emailAntigoExiste) {
                const existeUser = String(await trx('usuarios').where('usu_email', String(usu_emailNovo)).select('*')) ? true : false;
                if (existeUser) {
                    resposta = { erro: "Email já cadastrado!" };
                } else {
                    await trx('usuarios').where('usu_email', String(usu_emailAntigo)).update({ usu_email: String(usu_emailNovo) });
                    resposta = { success: "Email atualizado com sucesso!" };
                }
            } else {
                resposta = { erro: "Email not found!" };
            }

            await trx.commit().catch(err => (console.log(err)));
        } else {
            resposta = { erro: "Formato de email inválido!" }
        }
        return response.json(resposta);

    }

    async updateSenha(request: Request, response: Response) {
        const saltRounds = 10;

        const {
            usu_id,
            usu_senhaAntiga,
            usu_senhaNova
        } = request.body;

        const trx = await knex.transaction();
        const user = await trx('usuarios').where('usu_id', String(usu_id)).select('*');
        const newHashedPassword = await bcrypt.hash(String(usu_senhaNova), saltRounds);
        let resposta;


        if (await bcrypt.compare(String(usu_senhaAntiga), user[0].usu_senha)) {
            await trx('usuarios').where('usu_id', String(usu_id)).update({ usu_senha: newHashedPassword });
            resposta = { success: 'Senha atualizada com sucesso.' };
        } else {
            resposta = { erro: 'Senha antiga não confere.' };
        }

        await trx.commit().catch(err => (console.log(err)));
        return response.json(resposta);

    }



    async authUser(request: Request, response: Response) {
        const {
            usu_email,
            usu_senha
        } = request.body;


        const trx = await knex.transaction();
        const user = await trx('usuarios').where('usu_email', usu_email).select('*');

        await trx.commit().catch(err => (console.log(err)));

        if (String(user)) {
            await bcrypt.compare(usu_senha, user[0].usu_senha, function (err, res) {
                if (res) {
                    return response.json(user[0]);
                } else {
                    return response.json({ erro: 'Invalid Password!' })
                }
            });

        } else {
            return response.json({ erro: 'User not found!' })
        }

    }

}

export default UsuariosController;