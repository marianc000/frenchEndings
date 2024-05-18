import { F, M, genderMap } from '../constants/data.js';
import { wordCount } from '../tree/tree.js';

export function fmr(v) {
    const mp = malePercents(v);
    const fp = 100 - mp;
    const f = fp ? `${fp.toFixed(1)}%` : '';
    const m = mp ? `${mp.toFixed(1)}%` : '';

    return `<div class="numbers"><div class="${genderMap[F]}">${f}</div><div class="${genderMap[M]}">${m}</div><div>${wordCount(v)}</div></span>`;
}

export function malePercents(v) {
    return Math.round(1000 * v[M].length / wordCount(v)) / 10;
}

// export function endingDiv(k) {
//     return `<div class="key" style='width:${k.length}em'>${k}</div>`;
// }

// export function div(v, claz) {
//     return `<div ${claz ? ('class="' + claz + '"') : ''}>${v}</div>`;
// }

export function genderColor(v) {
    return `color:color-mix(in hsl, royalblue ${malePercents(v)}%, deeppink)`;
}