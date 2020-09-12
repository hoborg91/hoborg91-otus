import React, { Component } from 'react';
import * as Weather from '../contracts/IWeatherRecord';

export default class Results extends Component<{ 
    results: Weather.IWeatherRecord[],
    favouriteLocations: string[],
    onClick: (location: string) => any,
}> {
    render = () => <div className="results">
        <div>
            {this.props.results.map(wd => 
                <div 
                    className="results-single-result"
                    key={wd.location} 
                    onClick={() => this.props.onClick(wd.location)}
                >
                    {wd.location}
                    {this.props.favouriteLocations.indexOf(wd.location) >= 0 ? '\u2605' : ''}
                </div>
            )}
        </div>
    </div>;
}
