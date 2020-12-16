import React from "react";

const DataDiferenca = (value: string) => {
    let digitoFinal = "1";

    let dataViagem = value.split(" ");
    let dataDiaMesAno = dataViagem[0];
    let diaMesAno = dataDiaMesAno.split("/");    
    let horaMin = dataViagem[1].split(":");
    
    let somaMinutos = Number(horaMin[0])*60 + Number(horaMin[1]);

    let dataFormatada = Number( digitoFinal+ diaMesAno[2] + diaMesAno[1] + diaMesAno[0] + digitoFinal );


    let data = new Date();

    let dia = data.getDate();
    let mes = (data.getMonth() + 1);
    let ano = data.getFullYear();
    let hora = data.getHours();
    let minutos = data.getMinutes();
    let somaMinutosAtual = hora * 60 + minutos;

    let digitoDia = dia < 10 ? "0" : "";
    let digitoMes = mes < 10 ? "0" : "";

    const data_atual = Number(digitoFinal +String(ano) + digitoMes + String(mes) + digitoDia + String(dia) + digitoFinal);

    let dif = somaMinutos - somaMinutosAtual;

    if (data_atual <= dataFormatada) {
        return dif >= 0 && dif <= 120 ? true : false;
    } else {

        return false;
    }



}

export default DataDiferenca;