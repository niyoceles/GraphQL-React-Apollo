import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

import './App.css';

// apollo client setup

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <nav className="navbar" sticky="top"><h2>GraphQL and React Apollo Application</h2></nav>
          <AddBook />
          <BookList />
        </div>
      </ApolloProvider>
    )
  }
}

export default App;
