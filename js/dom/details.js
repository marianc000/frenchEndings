function endingsDetails() {
    return [...outDiv.querySelectorAll('details.ending')];
}

export function details() {
    return [...outDiv.querySelectorAll('details')];
}
 
export function close(details) {
    details.forEach(el => el.open = false);
}

export function open(details) {
    details.forEach(el => el.open = true);
}

export function openEndings() {
    open(endingsDetails());
}

export function closeEndings() {
    close(endingsDetails());
}

// export function openDetails() {
//     open(details());
// }

// export function closeDetails() {
//     close(details());
// } 