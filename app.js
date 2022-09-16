const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({ 
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
 }));

mongoose.connect('mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@node-rest-shop.7xmmw98.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});
