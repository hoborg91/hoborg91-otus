import React, { Component } from "react";
import { IItem } from '../contracts/item';
import ItemComponent from "./ItemComponent";

export class ItemListComponent extends Component<{ items: IItem[] }> {
    private get _items(): IItem[] {
        return this.props.items;
    }

    constructor(props: { items: IItem[] }) {
        super(props);
    }

    render = () => <div>
        {this._items.map(i => <ItemComponent item={i} />)}
    </div>;
}
