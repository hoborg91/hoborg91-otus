import sample from './sample.json';
import {html, render} from 'lit-html';

function root(item) {
    return html`
<div>${item.id}</div>
<ul>
    ${item.items ? lst(item.items) : ''}
</ul>`;
}

function lst(items) {
    return items.map(i => html`<li>${root(i)}</li>`);
}

render(root(sample), document.body);
