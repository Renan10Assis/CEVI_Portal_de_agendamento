export interface AuthUsuario {
    token: string;
    isLogged: boolean;
    user: {
        usu_id: string;
        usu_nome: string;
        usu_email: string;
        usu_tipo: string;
        usu_imagem: string;
        emp_id: string;
        emp_nomeFantasia: string;
    }
}