import React, { Component } from "react";
import { IItem } from '../contracts/item';

export default class ItemComponent extends Component<{ item: IItem; }> {
    private get _item(): IItem {
        return this.props.item;
    }

    private get _css() {
        return {
            'border': '1px solid grey',
            'border-radius': '5px',
            'margin': '5px',
            'padding-left': '5px',
            'padding-right': '5px',
            'max-width': '400px',
        };
    }

    constructor(props: { item: IItem; }) {
        super(props);
    }

    render = () => <div style={this._css}>
        <h3>
            <span style={{ 
                    marginRight: '5px', 
                    color: this._item.done ? 'green' : 'black', 
                }}
            >
                {this._item.done ? '\u2714' : '\u23f3'}
            </span>
            {this._item.caption}
        </h3>
        <p>
            {this._item.description}
        </p>
    </div>;
}
