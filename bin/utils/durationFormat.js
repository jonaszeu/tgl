// Duration format representation function


// Classic (47:06 min) 
export function getDifferenceInTimeStringClassic(date1, date2) {
    const diffMilliseconds = Math.abs(date1 - date2);

    const minutes = Math.floor(diffMilliseconds / (1000 * 60));
    const seconds = Math.floor((diffMilliseconds % (1000 * 60)) / 1000);

    return `${minutes}:${String(seconds).padStart(2, '0')} min`;
}


// Improved (0:47:06)
export function getDifferenceInTimeStringImproved(date1, date2) {
    const diffMilliseconds = Math.abs(date1 - date2);

    let remaining = diffMilliseconds;

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    remaining %= (1000 * 60 * 60);

    const minutes = Math.floor(remaining / (1000 * 60));
    remaining %= (1000 * 60);

    const seconds = Math.floor(remaining / 1000);

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}\n`;
}


// Decimal (0.79 h)
export function getDifferenceInTimeStringDecimal(date1, date2) {
    const diffMilliseconds = Math.abs(date1 - date2);

    const hours = diffMilliseconds / (1000 * 60 * 60);

    return `${hours.toFixed(2)} h`;
}
