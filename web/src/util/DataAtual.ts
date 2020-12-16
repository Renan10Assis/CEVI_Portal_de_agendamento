import React from "react";

const DataAtual = () => {
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

    const data_completa = String(digitoDia+dia + '/' + digitoMes + mes + '/' + ano + ' ' + digitoHora + hora + ':' + digitoMin + minutos);

    return data_completa;

}

export default DataAtual;