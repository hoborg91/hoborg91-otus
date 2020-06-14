const { tree, } = require('./tree.js');
const path = require('path');

const glue = (p) => {
    const splitted = p.split('/');
    return path.join(...splitted);
}

describe('tree', () => {
    it('returns an object with files and folders', () => {
        return tree('./').then(result => {
            expect(result.files).toBeDefined();
            expect(result.folders).toBeDefined();
        });
    });

    it('returns an object with expected files list', () => {
        return tree('./').then(result => {
            expect(result.files).toContain('tree.js');
            expect(result.files).toContain('readme.md');
            expect(result.files).toContain(glue('node_modules/jest/README.md'));
        });
    });

    it('returns an object without folders in the files list', () => {
        return tree('./').then(result => {
            expect(result.files).not.toContain('node_modules');
        });
    });

    it('returns an object with expected folders list', () => {
        return tree('./').then(result => {
            expect(result.folders).toContain('node_modules');
            expect(result.folders).toContain(glue('node_modules/jest'));
        });
    });

    it('returns an object without folders in the files list', () => {
        return tree('./').then(result => {
            expect(result.folders).not.toContain('tree.js');
        });
    });
});