const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        product(id: ID): Product
        cart(id: ID): Cart
    }

    type Mutation {
        addReview(productId: ID, comment: String, rating: Int): ID!
        addToCart(cartId: ID, productId: ID): Boolean!
        setProductQuantityInCart(cartId: ID, productId: ID, quantity: Int): Boolean!
    }

    type Product {
        id: ID!
        name: String
        price: Money
        state: ProductState
        reviews: [ProductReview]
    }

    type ProductReview {
        id: ID!
        comment: String
        rating: Int
    }

    type ProductQuantity {
        product: Product!
        quantity: Int!
    }

    type Cart {
        id: ID!
        products: [ProductQuantity]
    }

    type Money {
        rubles: Int
        kopeks: Int
    }

    enum ProductState { 
        AVAILABLE, 
        SOLDOUT, 
    }
`);

const products = 
[
    { 
        id: 101, 
        name: 'Medicine mask', 
        price: { rubles: 99, kopeks: 50, }, 
        state: 'SOLDOUT', 
        reviews: [],
    },
    { 
        id: 102, 
        name: 'Anticeptic', 
        price: { rubles: 200, kopeks: 0, }, 
        state: 'AVAILABLE', 
        reviews: [
            {
                id: 10201,
                comment: 'Very good gloves',
                rating: 5,
            }
        ],
    },
    { 
        id: 103, 
        name: 'Medicine gloves (pair)', 
        price: { rubles: 290, kopeks: 0, }, 
        state: 'AVAILABLE', 
        reviews: [],
    }
];

const carts = [
    {
        id: 1,
        products: [],
    },
];

const root = { 
    product: (a) => products.filter(p => p.id == a.id)[0], 
    cart: (a) => carts.filter(c => c.id == a.id)[0], 
    addReview: (a) => {
        const product = products.filter(p => p.id == a.productId)[0];
        const maxId = Math.max(product.reviews.map(r => r.id));
        const review = {
            id: maxId + 1,
            comment: a.comment,
            rating: a.rating,
        };
        product.reviews.push(review);
        return review.id;
    }, 
    addToCart: (a) => {
        const cart = carts.filter(c => c.id == a.cartId)[0];
        const product = products.filter(p => p.id == a.productId)[0];
        if (product.state !== 'AVAILABLE') {
            return false;
        }
        if (cart.products.indexOf(product) < 0) {
            cart.products.push({
                product,
                quantity: 1
            });
            return true;
        } else {
            return false;
        }
    },
    setProductQuantityInCart: (a) => {
        if (a.quantity < 0)
            return false;
        const cart = carts.filter(c => c.id == a.cartId)[0];
        const products = cart.products.filter(p => p.product.id == a.productId);
        if (products.length === 0)
            return false;
        if (a.quantity === 0) {
            cart.products = cart.products.filter(p => !(p.product.id == a.productId));
            return true;
        } else {
            products[0].quantity = a.quantity;
            return true;
        }
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
const server = app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

module.exports = server;