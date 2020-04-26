import sample from './sample.json';

window.customElements.define('my-leaf', class extends HTMLDivElement {
    connectedCallback() {
        const content = JSON.parse(this.getAttribute('content'));

        const shadow = this.attachShadow({ mode: 'open', });
        
        const labelDiv = document.createElement('div');
        labelDiv.innerText = content.id;
        shadow.appendChild(labelDiv);
        
        if (!content.items)
            return;
        
        const child = document.createElement('ul', { is: 'my-tree', });
        child.setAttribute('content', JSON.stringify(content.items));
        shadow.appendChild(child);
    }
}, { extends: 'div', });

window.customElements.define('my-tree', class extends HTMLUListElement {
    connectedCallback() {
        const content = JSON.parse(this.getAttribute('content'));

        const items = this.getAttribute('content');
        JSON.parse(items).forEach(item => {
            const li = document.createElement('li');

            const child = document.createElement('div', { is: 'my-leaf', });
            child.setAttribute('content', JSON.stringify(item));
            li.appendChild(child);

            this.appendChild(li);
        });
    }
}, { extends: 'ul', });

const root = document.createElement('div', { is: 'my-leaf', });
root.setAttribute('content', JSON.stringify(sample));
document.body.appendChild(root);
