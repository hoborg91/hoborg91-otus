export enum WindDirection {
    East,
    NorthEast,
    North,
    NorthWest,
    West,
    SouthWest,
    South,
    SouthEast,
}

export interface ISimpleWeatherRecord {
    temperatureCelcius: number,
    atmosphericPressureMmHg: number,
    humidityPercents: number,
    windVelocityMps: number,
    windDirection: WindDirection,
}

export interface IWeatherRecord {
    location: string,
    byHourForecast: ISimpleWeatherRecord[],
}
