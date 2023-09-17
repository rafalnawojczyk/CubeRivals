export const removeElementFromArray = (arr: Realm.List<number>, elementToRemove: number): Realm.List<number> => {
    const index = arr.indexOf(elementToRemove);

    if (index !== -1) {
        return arr.slice(0, index).concat(arr.slice(index + 1)) as unknown as Realm.List<number>;
    }

    return arr.slice() as unknown as Realm.List<number>;
};
