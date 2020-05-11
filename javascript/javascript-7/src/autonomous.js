import sample from './sample.json';

window.customElements.define('my-tree', class extends HTMLElement {
    connectedCallback() {
        const content = JSON.parse(this.getAttribute('content'));
        
        const shadow = this.attachShadow({ mode: 'open', });
        
        const leaf = document.createElement('my-leaf');
        leaf.setAttribute('id', content.id);
        leaf.style.display = 'block';
        shadow.appendChild(leaf);

        if (!content.items)
            return;

        content.items.forEach(item => {
            const child = document.createElement('my-tree');
            child.setAttribute('content', JSON.stringify(item));
            child.style.display = 'block';
            child.style.marginLeft = '20px';
            shadow.appendChild(child);
        })
    }
});

window.customElements.define('my-leaf', class extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `(${this.getAttribute('id')})`;
    }
});

const root = document.createElement('my-tree');
root.setAttribute('content', JSON.stringify(sample));
  
document.body.appendChild(root);