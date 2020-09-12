import React, { Component } from 'react';
import * as Weather from '../contracts/IWeatherRecord';

export default class Details extends Component<IDetailsProps> {
    private get _weather() {
        return this.props.weather;
    }

    private _decodeDirection = (e: Weather.WindDirection) => {
        switch (e) {
            case Weather.WindDirection.East: return 'E';
            case Weather.WindDirection.NorthEast: return 'NE';
            case Weather.WindDirection.North: return 'N';
            case Weather.WindDirection.NorthWest: return 'NW';
            case Weather.WindDirection.West: return 'W';
            case Weather.WindDirection.SouthWest: return 'SW';
            case Weather.WindDirection.South: return 'S';
            case Weather.WindDirection.SouthEast: return 'SE';
        }
    };

    private _swithIsFavourite = () => {
        const newValue = !this.props.isFavourite;
        this.props.onSetFavourite(newValue)
    }

    render = () => this._weather ? <div>
        <small>Weather in </small>
        <h3 className="details-header">
            {this._weather.location}
            <span className="details-star" onClick={this._swithIsFavourite}>
                {this.props.isFavourite ? '\u2605' : '\u2606'}
            </span>
        </h3>
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Temperature, &deg;C</th>
                    <th>Atmospheric pressure, mm Hg</th>
                    <th>Humidity, %</th>
                    <th>Wind velocity, m/s</th>
                    <th>Wind direction</th>
                </tr>
            </thead>
            <tbody>
                {this._weather.byHourForecast.slice(0, 24).map((swr, i) => 
                    <tr key={i}>
                        <td>{i === 0 ? 'Now' : `In ${i} h.`}</td>
                        <td>{swr.temperatureCelcius}</td>
                        <td>{swr.atmosphericPressureMmHg}</td>
                        <td>{swr.humidityPercents}</td>
                        <td>{swr.windVelocityMps}</td>
                        <td>{this._decodeDirection(swr.windDirection)}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div> : <div></div>;
}

interface IDetailsProps {
    weather: Weather.IWeatherRecord | null,
    isFavourite: boolean,
    onSetFavourite: (isFavourite: boolean) => any,
}
