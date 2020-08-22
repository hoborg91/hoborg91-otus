export function slideTo(array, currentIndex, direction, test) {
    if (direction === 0 || array.filter(e => test(e)).length <= 1)
        return currentIndex;
    if (direction > 0) {
        for (let i = currentIndex + direction; i < array.length; i++) {
            if (test(array[i]))
                return i;
        }
        for (let i = 0; i < currentIndex; i++) {
            if (test(array[i]))
                return i;
        }
    }
    if (direction < 0) {
        for (let i = currentIndex + direction; i >= 0; i--) {
            if (test(array[i]))
                return i;
        }
        for (let i = array.length - 1; i >= currentIndex; i--) {
            if (test(array[i]))
                return i;
        }
    }
}