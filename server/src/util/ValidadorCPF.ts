
class ValidadorCPF{
    validarCPF(cpf:string){
        
        const cpfNumbers = cpf.replace('.',"").replace('.','').replace('-','');

        if (cpfNumbers == null) {
            return false;
        }
        if (cpfNumbers.length != 11) {
            return false;
        }
        if ((cpfNumbers == '00000000000') || (cpfNumbers == '11111111111') || (cpfNumbers == '22222222222') || (cpfNumbers == '33333333333') || (cpfNumbers == '44444444444') || (cpfNumbers == '55555555555') || (cpfNumbers == '66666666666') || (cpfNumbers == '77777777777') || (cpfNumbers == '88888888888') || (cpfNumbers == '99999999999')) {
            return false;
        }
        let numero: number = 0;
        let caracter: string = '';
        let numeros: string = '0123456789';
        let j: number = 10;
        let somatorio: number = 0;
        let resto: number = 0;
        let digito1: number = 0;
        let digito2: number = 0;
        let cpfAux: string = '';
        cpfAux = cpfNumbers.substring(0, 9);
        for (let i: number = 0; i < 9; i++) {
            caracter = cpfAux.charAt(i);
            if (numeros.search(caracter) == -1) {
                return false;
            }
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito1 = 11 - resto;
        if (digito1 > 9) {
            digito1 = 0;
        }
        j = 11;
        somatorio = 0;
        cpfAux = cpfAux + digito1;
        for (let i: number = 0; i < 10; i++) {
            caracter = cpfAux.charAt(i);
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito2 = 11 - resto;
        if (digito2 > 9) {
            digito2 = 0;
        }
        cpfAux = cpfAux + digito2;
        if (cpfNumbers != cpfAux) {
            return false;
        }
        else {
            return true;
        }
    }
}
export default ValidadorCPF;