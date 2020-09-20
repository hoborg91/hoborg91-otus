import React from 'react';
import ReactDOM from 'react-dom';
import { ItemListComponent } from './components/ItemListComponent';
import { items } from './contracts/item';

ReactDOM.render(
    <ItemListComponent items={items} />, 
    document.getElementById('app')
);
