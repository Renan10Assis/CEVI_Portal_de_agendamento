
const ValidarEmail = (email: string) => {
    let usuario = email.substring(0, email.indexOf("@"));
    let dominio = email.substring(email.indexOf("@") + 1, email.length);

    let email_valido = false;

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {

        email_valido = true;

    } else {
        email_valido = false;
    }

    //console.log(email_valido);
    return email_valido;

}


export default ValidarEmail;

/*
 Email deve:
 *Não possuir espaços;
 *Possuir o @;
 *Possuir algum caracter após o @;
 *Possuir algum caracter antes do @;
 *Possuir pelo menos um ponto após o caracter depois do @;
 *Possuir algum caracter após o ponto.
*/