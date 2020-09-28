import React, { Component, } from 'react';
import './App.css';
import Search from './components/Search';
import Results from './components/Results';
import Details from './components/Details';
import * as Weather from './contracts/IWeatherRecord';
import { compareLocations, locId } from './infrastructure/utilities';
import { connect } from 'react-redux';
import { IStoreState } from './stateManagement/redux';
import { star, unstar } from './stateManagement/actions';
import { Route } from 'react-router-dom';
import { History as Hst } from 'history';
import { Dispatch } from 'redux';

export class App extends Component<IAppProps & { match: { params: { locationId: string, }}}, IAppState> {
    constructor(props: IAppProps & { match: { params: { locationId: string, }}}) {
        super(props);
        this.state = {
            searchedText: '',
            results: [],
        };
    }

    private _search = (searchedText: string) => {
        let results: Weather.IWeatherRecord[] = [];
        if (searchedText !== null && searchedText.length > 0) {
            results = this.props.weather
                .filter(wd => wd.location.toLowerCase().indexOf(searchedText.toLowerCase()) >= 0);
            results.sort((a, b) => compareLocations(a, b, this.props.favouriteLocations));
            results = results.slice(0, 5);
        }
        this.setState({
            searchedText,
            results,
        });
    };

    private _openLocation = (location: string, history: Hst<unknown>) => {
        history.push('/' + locId(this.state.results.filter(r => r.location === location)[0].location));
        this.setState({ 
            searchedText: '',
            results: [],
        });
    };

    private _onEnter = (history: Hst<unknown>) => {
        if (this.state.results.length === 0)
            return;
        this._openLocation(this.state.results[0].location, history);
    };

    private _onSetFavourite = (newValue: boolean) => {
        const locationId = this.props.match.params.locationId;
        const weather = this.props.weather.filter(w => locId !== null && locId(w.location) === locationId);
        const selectedDetails = weather.length > 0 ? weather[0] : null;
        if (selectedDetails === null)
            return;
        this.props.setFavourite(selectedDetails.location, newValue);
    }

    render = () => {
        const locationId = this.props.match.params.locationId;
        const weather = this.props.weather.filter(w => locId !== null && locId(w.location) === locationId);
        const selectedDetails = weather.length > 0 ? weather[0] : null;
        return  <div className="App">
        <Route render={({ history }) => (
            <Search 
                searchedText={this.state.searchedText}
                onInput={this._search} 
                onEnter={() => this._onEnter(history)} />
        )} />
        <Route render={({ history }) => (
            <Results 
                results={this.state.results} 
                onClick={(loc: string) => this._openLocation(loc, history)}
                favouriteLocations={this.props.favouriteLocations} />
        )} />
            <Details
                weather={selectedDetails}
                onSetFavourite={this._onSetFavourite}
                isFavourite={ selectedDetails 
                    ? this.props.favouriteLocations.indexOf(selectedDetails.location) >= 0
                    : false} />
            
        </div>;
    }
}

interface IAppProps extends IStoreState {
    setFavourite: (location: string, newValue: boolean) => any,
}

interface IAppState {
    searchedText: string,
    results: Weather.IWeatherRecord[],
}

const mapStateToProps = (state: IStoreState) =>  ({
    weather: state.weather,
    favouriteLocations: state.favouriteLocations,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setFavourite: (location: string, newValue: boolean) => dispatch((newValue ? star : unstar)(location)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
