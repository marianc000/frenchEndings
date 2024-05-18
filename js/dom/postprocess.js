import { details, open, close } from "./details.js";

export function removeUnnecesseryDetails(div, callback) {

    div.style.visibility = 'hidden';

    const allDetails = details();
    const leafDetails = allDetails.filter(el => !el.querySelector('details'));
    open(allDetails);
    requestAnimationFrame(measureOpened);

    function measureOpened() {
        leafDetails.forEach(el => el.openedHeight = el.clientHeight);
        close(leafDetails);
        requestAnimationFrame(measureClosed);
    }

    function measureClosed() {
        leafDetails.forEach(el => el.closedHeight = el.clientHeight)
        close(allDetails);
        const oneLineDetails = leafDetails.filter(el => el.openedHeight === el.closedHeight);

        console.log('>oneLineDetails', oneLineDetails.length);
        oneLineDetails.forEach(el => {
            const div = el.querySelector('div');
            div.classList.remove('two');
            div.classList.add('one');
            el.replaceWith(el.querySelector('div'));
        });
        div.style.visibility = 'visible';
        setTimeout(() => { console.timeEnd('paint'); callback(); });
    }
}