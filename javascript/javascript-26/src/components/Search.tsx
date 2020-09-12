import React, { Component } from 'react';

export default class Search extends Component<ISearchProps> {
    private _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onInput(e.target.value);
    };

    private _onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13)
            this.props.onEnter();
    };

    render = () => <div>
        <input 
            onChange={this._onChange} 
            value={this.props.searchedText}
            onKeyUp={this._onKeyUp} />
    </div>;
}

export interface ISearchProps {
    searchedText: string, 
    onInput: (text: string) => any,
    onEnter: () => any,
}
