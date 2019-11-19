import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// allow cross-origin requests
app.use(cors());
// connect to mlab
mongoose.connect('mongodb://gqlusername:Gql123@ds029817.mlab.com:29817/gql-react-app',
  { useFindAndModify: false }
);
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