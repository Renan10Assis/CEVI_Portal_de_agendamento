import express from 'express';
import UsuariosController from './database/controllers/UsuariosController';
import EmpresaController from './database/controllers/EmpresaController';
import EmpresaEnderecosController from './database/controllers/EmpresaEnderecosController';
import MotoristaController from './database/controllers/MotoristaController';
import ViagemController from './database/controllers/ViagemController';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();

const upload = multer(multerConfig);


const usuariosController = new UsuariosController();
const empresaController = new EmpresaController();
const empresaEnderecosController = new EmpresaEnderecosController();
const motoristaController = new MotoristaController();
const viagemController = new ViagemController();

routes.get('/usuarios', usuariosController.index);
routes.post('/usuarios', upload.single('usu_imagem') ,usuariosController.create);
routes.post('/usuarios/auth', usuariosController.authUser);
routes.put('/usuarios/put', upload.single('usu_imagem'),usuariosController.updateProfileImage);
routes.put('/usuarios/setpwd', usuariosController.updateSenha);
routes.put('/usuarios/seteml', usuariosController.updateEmail);
routes.put('/usuarios', usuariosController.update);
routes.delete('/usuarios/:usu_id', usuariosController.delete);

routes.get('/empresas', empresaController.index);
routes.post('/empresas', empresaController.create);
routes.put('/empresas', empresaController.update);

routes.get('/empresas/enderecos', empresaEnderecosController.index);
routes.get('/empresas/enderecos-favoritos/:emp_id', empresaEnderecosController.show);
routes.post('/empresas/enderecos-favoritos', empresaEnderecosController.create);
routes.delete('/empresas/enderecos-favoritos/:end_id', empresaEnderecosController.delete);


routes.get('/motoristas', motoristaController.index);
routes.post('/motoristas', motoristaController.create);
routes.put('/motoristas',motoristaController.update);

routes.get('/viagens',viagemController.index);
routes.get('/viagens/:emp_id', viagemController.show);
routes.post('/viagens',viagemController.create);
routes.put('/viagens/upd-mot', viagemController.updateMotoristaViagem);
routes.put('/viagens/upd-status', viagemController.updateStatusViagem);


export default routes;