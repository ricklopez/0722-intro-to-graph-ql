// var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');

// // Construct a schema, using GraphQL schema language
// // https://graphql.org/learn/schema/
// var schema = buildSchema(`
//   type Query {
//     hello: String,
//     allDogs(last: Int): [Dog!]!
//   },
//   type Dog {
//     id: Int,
//     name: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
//   allDogs: (last) => {
//     return [{id: 1, name: 'Mona Lisa'}];
//   }
// };

// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000);
// console.log('Running a GraphQL API server at localhost:4000/graphql');


var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
// https://graphql.org/learn/schema/
var schema = buildSchema(`
  type Query {
    hello: String,
    allDogs(last: Int): [Dog!]!
    getBreed(breedId: Int): Breed!
  },

  type Dog {
    id: Int,
    name: String
    breed: Breed!
  }

  type Breed {
    id: Int,
    name: String!,
    code: Int,
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  allDogs: (args) => {
    console.log(args.last);
    if(args.last === 1)
      return [{id: 1, name: 'Mona Lisa'}];
    return [{id: 1, name: 'Athena'}, {id: 2, name: 'Mona Lisa'}];
  },
  getBreed: (args) => {
    console.log(args);
    const breeds = {
    1: {id: 1, name: 'Border Collie' }
    }; 
    return breeds[args.breedId];
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');