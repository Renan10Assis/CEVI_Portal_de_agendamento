
export const TelMask = (v:string) => {
  v=v.replace(/\D/g,"")           //Remove tudo o que não é dígito
  .replace(/(\d{2})(\d)/,"($1) $2")//Coloca parênteses em volta dos dois primeiros dígitos
  .replace(/(\d{5})(\d{1,2})/,"$1-$2")
  .replace(/(-\d{4})\d+?$/, '$1') 

  return v
}
