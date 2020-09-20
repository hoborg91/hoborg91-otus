import { configureStore } from '@reduxjs/toolkit'
import { IWeatherRecord } from '../contracts/IWeatherRecord';
import { InventWeather, } from '../data/weather';
import { remove, union } from '../infrastructure/utilities';
import { STAR, UNSTAR } from './constants';

export interface IStoreState {
    weather: IWeatherRecord[];
    favouriteLocations: string[];
}

const localStorageKey = 'https://github.com/hoborg91/hoborg91-otus/weatherAppFavouriteLocations';

function loadFavouriteLocations() {
    const favStr = localStorage.getItem(localStorageKey);
    return favStr === null ? [] : JSON.parse(favStr) as string[];
}

function saveFavouriteLocations(favouriteLocations: string[]) {
    localStorage.setItem(localStorageKey, JSON.stringify(favouriteLocations));
}

const initialState: IStoreState = { 
    weather: InventWeather(24 * 10), 
    favouriteLocations: loadFavouriteLocations(),
};

function reducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === STAR) {
        const result = {
            ...state,
            favouriteLocations: union(state.favouriteLocations, action.payload.location as string),
        };
        saveFavouriteLocations(result.favouriteLocations);
        return result;
    }
    if (action.type === UNSTAR) {
        const result =  {
            ...state,
            favouriteLocations: remove(state.favouriteLocations, action.payload.location as string),
        };
        saveFavouriteLocations(result.favouriteLocations);
        return result;
    }
    return state;
}

export const store = configureStore({ 
    reducer,
    middleware: [],
});
