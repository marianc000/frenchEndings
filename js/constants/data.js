export const F = 'F', M = 'M' ;
export const FEMININS = 'féminins', MASCILINS = 'masculins';

 export  const genderMap = {
    [F]: FEMININS,
    [M]: MASCILINS
}
export function genderClass(k){
    return genderMap[k];
}

export const SEPARATOR=', ';