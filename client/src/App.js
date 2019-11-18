import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/bookList';
import './App.css';

// apollo client setup

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App" >
          <h1>This GraphQL and React Apollo Application</h1>
          <BookList />
        </div>
      </ApolloProvider>
    )
  }
}

export default App;
