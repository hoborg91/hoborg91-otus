import sample from './sample.json';
import { LitElement, html } from 'lit-element';

class MyLeaf extends LitElement {
    static get properties() {
        return { content: { type: String, }, };
    }

    render() {
        const content = JSON.parse(this.content);

        const self = html`<div>${content.id}</div>`;
        const children = content.items 
            ? html`<my-tree .content="${JSON.stringify(content.items)}"></my-tree>` 
            : '';
        return html`
            ${self}
            ${children}
        `;
    }
}

class MyTree extends LitElement {
    static get properties() {
        return { content: { type: String, }, };
    }

    render() {
        const content = JSON.parse(this.content);
        return html`
            <ul>
                ${content.map(i => html`<my-leaf .content="${JSON.stringify(i)}"></my-leaf>`)}
            </ul>
        `;
    }
}

window.customElements.define('my-leaf', MyLeaf);
window.customElements.define('my-tree', MyTree);

const root = document.createElement('my-leaf');
root.setAttribute('content', JSON.stringify(sample));

document.body.appendChild(root);
