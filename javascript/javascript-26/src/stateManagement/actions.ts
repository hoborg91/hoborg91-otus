import { STAR, UNSTAR } from "./constants";

export const star = (location: string) => ({
    type: STAR,
    payload: { location },
});

export const unstar = (location: string) => ({
    type: UNSTAR,
    payload: { location },
});