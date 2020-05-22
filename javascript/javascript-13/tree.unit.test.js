const { tree, } = require('./tree.js');
const path = require('path');

const glue = (p) => {
    const splitted = p.split('/');
    return path.join(...splitted);
}

describe('tree', () => {
    it('throws on empty path', () => {
        return tree('  ').catch(e => {
            expect(e.message).toBeDefined();
            expect(e.message).toContain('path');
        });
    });
});