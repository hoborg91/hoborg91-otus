import * as Weather from '../contracts/IWeatherRecord';
import locations from './locations.json';

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}

export function InventWeather(hours: number): Weather.IWeatherRecord[] {
    return locations.map(location => {
        const byHourForecast: Weather.ISimpleWeatherRecord[] = [];
        for (let h = 0; h <= hours; h++) {
            byHourForecast.push({
                temperatureCelcius: getRandomInt(-50, 50), 
                atmosphericPressureMmHg: getRandomInt(641, 816), 
                humidityPercents: getRandomInt(1, 100), 
                windVelocityMps: getRandomInt(0, 40), 
                windDirection: randomEnum(Weather.WindDirection),
            });
        }
        return {
            location,
            byHourForecast,
            isFavourite: false,
        };
    });
}