import React, { Component, } from 'react';
import './App.css';
import Search from './components/Search';
import Results from './components/Results';
import Details from './components/Details';
import * as Weather from './contracts/IWeatherRecord';
import { compareLocations } from './infrastructure/utilities';

export default class App extends Component<{ weatherData: Weather.IWeatherRecord[], }, IAppState> {
    constructor(props: { weatherData: Weather.IWeatherRecord[], }) {
        super(props);
        this.state = {
            searchedText: '',
            results: [],
            selectedDetails: null,
            favouriteLocations: [],
        };
    }

    private _search = (searchedText: string) => {
        let results: Weather.IWeatherRecord[] = [];
        if (searchedText !== null && searchedText.length > 0) {
            results = this.props.weatherData
                .filter(wd => wd.location.toLowerCase().indexOf(searchedText.toLowerCase()) >= 0);
            results.sort((a, b) => compareLocations(a, b, this.state.favouriteLocations));
            results = results.slice(0, 5);
        }
        this.setState({
            searchedText,
            results,
        });
    };

    private _openLocation = (location: string) => {
        this.setState({ 
            searchedText: '',
            results: [],
            selectedDetails: this.state.results
                .filter(r => r.location === location)[0], 
        });
    };

    private _onEnter = () => {
        if (this.state.results.length > 0)
            this._openLocation(this.state.results[0].location);
    };

    private _onSetFavourite = (newValue: boolean) => {
        if (this.state.selectedDetails === null)
            return;
        const loc = this.state.selectedDetails.location;
        let fav = this.state.favouriteLocations;
        if (newValue && fav.indexOf(loc) < 0)
            fav.push(loc);
        else if (!newValue && fav.indexOf(loc) >= 0)
            fav = fav.filter(f => f !== loc);
        this.setState({
            favouriteLocations: fav,
        });
    }

    render = () =>
        <div className="App">
            <Search 
                searchedText={this.state.searchedText}
                onInput={this._search} 
                onEnter={this._onEnter} />
            <Results 
                results={this.state.results} 
                onClick={this._openLocation}
                favouriteLocations={this.state.favouriteLocations} />
            <Details
                weather={this.state.selectedDetails}
                onSetFavourite={this._onSetFavourite}
                isFavourite={ this.state.selectedDetails 
                    ? this.state.favouriteLocations.indexOf(this.state.selectedDetails.location) >= 0
                    : false} />
        </div>;
}

interface IAppState {
    searchedText: string,
    results: Weather.IWeatherRecord[],
    selectedDetails: Weather.IWeatherRecord | null,
    favouriteLocations: string[],
}
