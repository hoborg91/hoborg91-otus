const fetch = require('node-fetch');

const post = (queryText) => {
    return fetch(
        'http://localhost:4000/graphql', 
        {
            method: 'post',
            body: JSON.stringify({ 
                query: queryText,
                variables: null,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
        .then(r => r.json());
}

let server;

beforeAll(() => {
    server = require('./server.js');
});
  
afterAll(() => {
    server.close();
});

describe('GraphQL server', () => {
    it('returns a cart with empty products collection', () => {
        return post('query { cart(id: 1) { products { product { name } quantity } } }')
            .then(j => {
                expect(j.data.cart.products).toBeDefined();
                expect(j.data.cart.products).toHaveLength(0);
            });
    });

    it('modifies a cart contnet', () => {
        const cartId = '1';
        const productId = '102';
        
        return post(`mutation { addToCart(cartId: ${cartId}, productId: ${productId}) }`)
            .then(j => {
                expect(j.data.addToCart).toEqual(true);
            })
            .then(() => post(`query { cart(id: ${cartId}) { products { product { id } } } }`))
            .then(j => {
                expect(j.data.cart.products).toBeDefined();
                expect(j.data.cart.products).toHaveLength(1);
                expect(j.data.cart.products[0].product.id).toEqual(productId);
            });
    });
});