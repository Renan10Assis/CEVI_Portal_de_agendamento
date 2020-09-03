import express from 'express';
import UsuariosController from './database/controllers/UsuariosController';
import EmpresaController from './database/controllers/EmpresaController';
import EmpresaEnderecosController from './database/controllers/EmpresaEnderecosController';
import MotoristaController from './database/controllers/MotoristaController';
import ViagemController from './database/controllers/ViagemController';
import EnderecoController from './database/controllers/EnderecoController';

const routes = express.Router();

const usuariosController = new UsuariosController();
const empresaController = new EmpresaController();
const empresaEnderecosController = new EmpresaEnderecosController();
const motoristaController = new MotoristaController();
const viagemController = new ViagemController();
const enderecoController = new EnderecoController();

routes.get('/usuarios', usuariosController.index);
routes.post('/usuarios', usuariosController.create);
routes.post('/usuarios/auth', usuariosController.authUser);
routes.put('/usuarios/setpwd', usuariosController.updateSenha);
routes.put('/usuarios/seteml', usuariosController.updateEmail);
routes.put('/usuarios', usuariosController.update);
routes.delete('/usuarios/:usu_id', usuariosController.delete);

routes.get('/empresas', empresaController.index);
routes.post('/empresas', empresaController.create);
routes.put('/empresas', empresaController.update);

routes.get('/empresas/enderecos-favoritos', empresaEnderecosController.show);
routes.delete('/empresas/enderecos-favoritos/:end_id', empresaEnderecosController.delete);

routes.get('/enderecos', enderecoController.index);
routes.post('/enderecos', enderecoController.create);

routes.get('/motoristas', motoristaController.index);
routes.post('/motoristas', motoristaController.create);
routes.put('/motoristas',motoristaController.update);

routes.get('/viagens',viagemController.index);
routes.get('/viagens/:emp_id', viagemController.show);
routes.post('/viagens',viagemController.create);
routes.put('/viagens/upd-mot', viagemController.updateMotoristaViagem);
routes.put('/viagens/upd-status', viagemController.updateStatusViagem);


export default routes;