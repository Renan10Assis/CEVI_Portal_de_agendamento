import React from "react";

const DataAtrasada = (value:string) => {

    let digitoFinal = "1";

    let dataViagem = value.split(" ");
    let dataDiaMesAno = dataViagem[0];
    let diaMesAno = dataDiaMesAno.split("/");    
    let horaMin = dataViagem[1].replace(":","");

    let dataFormatada = Number(diaMesAno[2] + diaMesAno[1] + diaMesAno[0] + horaMin + digitoFinal);
    

    let data = new Date();

    let dia = data.getDate();
    let mes = (data.getMonth() + 1);
    let ano = data.getFullYear();
    let hora = data.getHours();
    let minutos = data.getMinutes();

    let digitoDia = dia < 10 ? "0" : "";
    let digitoMes = mes < 10 ? "0" : "";
    let digitoHora = hora < 10 ? "0" : "";
    let digitoMin = minutos < 10 ? "0" : "";

    const data_atual = Number(String(ano).concat(digitoMes).concat(String(mes)).concat(digitoDia).concat(String(dia)).concat(digitoHora).concat(String(hora)).concat(digitoMin).concat(String(minutos)).concat(digitoFinal));


    return dataFormatada<data_atual? true:false;

}

export default DataAtrasada;