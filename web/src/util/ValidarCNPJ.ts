import React from "react";

const ValidarCNPJ = (cnpjAux: string) => {

    const multiplicador1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const multiplicador2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let somador;
    let resto;
    let digito;
    let verificacao = false;


    cnpjAux = cnpjAux.trim();
    cnpjAux = cnpjAux.replace(",", "").replace(",", "").replace(",", "").replace("/", "").replace("-", "");
    cnpjAux = cnpjAux.replace(".", "").replace(".", "").replace(".", "").replace("/", "").replace("-", "");
    cnpjAux = cnpjAux.replace(".", "").replace(".", "").replace(".", "").replace("/", "").replace("-", "");


    if (cnpjAux.length != 14) {
        verificacao = false;
    } else {

        let cnpj = cnpjAux.substring(0, 12); //cnpj sem os dígitos
        somador = 0;

        for (let i = 0; i < 12; i++) {
            somador += (Number(cnpj[i]) * multiplicador1[i]);
        }

        resto = somador % 11;

        resto = resto < 2 ? 0 : 11 - resto;

        digito = resto.toString();

        cnpj = cnpj + digito; // agora cnpj tem 13 numeros

        somador = 0;

        for (let i = 0; i < 13; i++) {
            somador += Number(cnpj[i]) * multiplicador2[i];
        }

        resto = somador % 11;

        resto = resto < 2 ? 0 : 11 - resto;

        digito += resto.toString();


        verificacao = cnpjAux.endsWith(digito);
    }

    //console.log(verificacao);
    return verificacao;
}



export default ValidarCNPJ;
