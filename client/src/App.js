import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Navbar, NavbarBrand } from 'reactstrap';

import BookList from './components/BookList';

import './App.css';

// apollo client setup

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='App'>
          <Navbar fixed='top' dark color='primary'>
            <div className='container'>
              <NavbarBrand>Book Register Application</NavbarBrand>
            </div>
          </Navbar>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
