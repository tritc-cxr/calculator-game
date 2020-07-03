// Getting a random number between two values
export function randomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min;
}

export function pickArrayRandom(array) {
    return array[randomInt(0, array.length - 1)];
}
