import express from 'express';
import UsuariosController from './database/controllers/UsuariosController';

const routes = express.Router();

const usuariosController = new UsuariosController();

routes.get('/usuarios', usuariosController.index);
routes.post('/usuarios', usuariosController.create);
routes.post('/usuarios/auth', usuariosController.authUser);
routes.put('/usuarios/setpwd', usuariosController.updateSenha);
routes.put('/usuarios/seteml', usuariosController.updateEmail);
routes.put('/usuarios', usuariosController.update);
routes.delete('/usuarios/:usu_id', usuariosController.delete);


export default routes;