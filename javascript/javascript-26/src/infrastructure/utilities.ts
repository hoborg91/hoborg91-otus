export function compareLocations<T>(a: { location: T, }, b: { location: T, }, favouriteLocations: T[]) {
    const af = favouriteLocations.indexOf(a.location) >= 0;
    const bf = favouriteLocations.indexOf(b.location) >= 0;
    if (af && !bf)
        return -1;
    if (bf && !af)
        return 1;
    return a.location <= b.location ? -1 : 1;
}

export function locId(location: string): string {
    let result = location.toLowerCase();
    result = result.replace(/\s+/g, '_');
    result = result.replace(/-/g, '_');
    return result;
}

export function union<T>(collection: T[], toAdd: T): T[] {
    const result = collection.concat([ toAdd, ]);
    return [...new Set(result)];
}

export function remove<T>(collection: T[], toRemove: T): T[] {
    return collection.filter(e => e !== toRemove);
}