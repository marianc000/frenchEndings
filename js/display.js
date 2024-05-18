import allEndings from './endings.json' with { type: 'json' };
import { F, M, SEPARATOR, FEMININS, MASCILINS } from './constants/data.js';
import { genderStats, endingsWithMinWords,endingsWithMaxWords, removeHundredPercent } from './tree/tree.js';
import { removeUnnecesseryDetails } from './dom/postprocess.js';
import { openEndings, closeEndings } from './dom/details.js';

console.log('allEndings', allEndings)
function html(ar) {
    return ar.map(o => detailsEnding(o)).join('');
}

function detailsGender(wordAr, genderClass) {
    if (!wordAr.length) return '';

    const words = '<i>' + wordAr.join('</i>' + SEPARATOR + '<i>') + '</i>';
    return `<details>
    <summary class="three ${genderClass}"><span inert>${wordAr.join(SEPARATOR)}</span></summary>
    <div class="two ${genderClass}">${words}</div> 
  </details>`;
}

function toPercents(n) {
    return n ? (n.toFixed(1) + '%') : '';
}

function detailsEnding(o) {
    const { wordCount, mp, fp } = genderStats(o);

    return `<details class='ending'>
    <summary style="${colorForMPercents(mp)}">
    <div class="key">${o.k}</div>
    ${numbers(fp, mp, wordCount)}
    </summary>${detailsGender(o[F], FEMININS)}${detailsGender(o[M], MASCILINS)}
  </details> `;
}

function numbers(fp, mp, wordCount) {
    return `<div class="numbers">
    <div class="${FEMININS}">${toPercents(fp)}</div><div class="${MASCILINS}">${toPercents(mp)}</div><div>${wordCount}</div>
    </div>`
}

function totalStats(endings) {
    return genderStats({
        [M]: [...new Set(endings.flatMap(o => o[M]))],
        [F]: [...new Set(endings.flatMap(o => o[F]))],
    });
}

function addTotal(endings) {
    const { wordCount, mp, fp } = totalStats(endings);
    return numbers(fp, mp, wordCount);
}

function colorForMPercents(v) {
    return `color:color-mix(in oklch, var(--blue) ${v}%, var(--pink))`;
}

function getMinWords() {
    return parseInt(minInp.value);
}

function getMinMPercent() {
    return parseInt(minMPercent.value);
}

function radio() {
    return [...document.querySelectorAll('input[type="radio"][name="gender"]')];
}
 
const allControls = [openBtn, closeBtn, minInp, minMPercent, ...radio()];
function paint() {
    allControls.forEach(el => el.disabled = true);
    console.time('paint');
    let endings = endingsWithMinWords(allEndings, getMinWords(), getMinMPercent() );
    console.log(endings);
    endings = removeHundredPercent(endings, 1);
    console.log(endings);
    outDiv.innerHTML = html(endings);

    totalsDiv.innerHTML = addTotal(endings);
    removeUnnecesseryDetails(outDiv, () => allControls.forEach(el => el.disabled = false));
}

openBtn.addEventListener('click', openEndings);
closeBtn.addEventListener('click', closeEndings);
minInp.addEventListener('change', paint);
minMPercent.addEventListener('change', paint);
radio().forEach(el => el.addEventListener('change', paint));
outDiv.addEventListener('click', onClick);
 

 
function onClick(e) {
    if (e.target.tagName === 'I') {
        open('https://www.larousse.fr/dictionnaires/francais/' + e.target.innerText);
    }
}
 
paint();