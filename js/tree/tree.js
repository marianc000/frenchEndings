import { F, M } from '../constants/data.js';

export function genderStats(v) {
    const wordCount = v[F].length + v[M].length;
    const mp = Math.round(1000 * v[M].length / wordCount) / 10;
    const fp = 100 - mp;
    return { wordCount, mp, fp };
}
//const MIN_LENGTH=20;
function hundredPercent(v, delta) {
    const { wordCount, mp, fp } = genderStats(v);
 
    //return !v[F].length || !v[M].length;
    //return Math.min(v[F].length, v[M].length) <= minWords;
    return Math.min(mp, fp) <= delta;
}

function visible(v, minWords, minPercents) {

    const { wordCount, mp, fp } = genderStats(v);
    if (wordCount >= minWords) {
        return Math.min(mp, fp) <= minPercents;
       // return hundredPercent(v, minPercents);
    }
}


export function removeHundredPercent(ar, delta) {
    let ar1 = ar.filter(o => hundredPercent(o, delta)).map(o => o.k);
    console.log('with100', ar1);

    let ar2 = ar1.slice(0);

    let i = 0;
    while (i < ar2.length) {
        const s = ar2[i];
        ar2 = ar2.filter(v => v === s || !v.endsWith(s));
        i++;
    }
    console.log('with1002', ar2);
    ar1 = ar1.filter(k => !ar2.includes(k));
    console.log('with1003', ar1);
    return ar.filter(o => !ar1.includes(o.k));
}

export function endingsWithMinWords(ar, minWords, minPercents ) {
    return ar.filter(v => visible(v, minWords, minPercents ));
};

export function endingsWithMaxWords(ar, minWords, minPercents) {
    return ar.filter(v => {
        const { wordCount, mp, fp } = genderStats(v);
        return wordCount < minWords && hundredPercent(v, minPercents)&&v.k.length===1;

    });
};
