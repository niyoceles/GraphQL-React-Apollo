const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
// connect to mlab
mongoose.connect('mongodb://gqlusername:Gql123@ds029817.mlab.com:29817/gql-react-app');
mongoose.connection.once('open', () => {
  console.log('Mongodb is connected');
})


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('server listening 4000');
});