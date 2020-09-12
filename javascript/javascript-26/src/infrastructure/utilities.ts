export function compareLocations<T>(a: { location: T, }, b: { location: T, }, favouriteLocations: T[]) {
    const af = favouriteLocations.indexOf(a.location) >= 0;
    const bf = favouriteLocations.indexOf(b.location) >= 0;
    if (af && !bf)
        return -1;
    if (bf && !af)
        return 1;
    return a.location <= b.location ? -1 : 1;
}