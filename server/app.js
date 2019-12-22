import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const { MONGO_URL} =  process.env;
// allow cross-origin requests
app.use(cors());
// connect to mlab
mongoose.connect(MONGO_URL,{ useFindAndModify: false });
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