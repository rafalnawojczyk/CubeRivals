export const removeElementFromArray = <T>(arr: T[], elementToRemove: T): T[] => {
    const index = arr.indexOf(elementToRemove);

    if (index !== -1) {
        return arr.slice(0, index).concat(arr.slice(index + 1));
    }

    return arr.slice();
};
