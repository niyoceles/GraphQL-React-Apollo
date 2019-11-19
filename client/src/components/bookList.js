import React, { Component } from 'react';
import { getBooksQuery } from '../queries/queries';
import { graphql } from 'react-apollo';

import BookDetails from './BookDetails'


class bookList extends Component {

  state = {
    selected: null,
  }
  // onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  displayBooks = () => {
    const data = this.props.data;
    if (data.loading) {
      return (<div> loading please wait ...</div>)
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id} onClick={(e) => { this.setState({ selected: book.id }) }}> {book.name}
          </li>)
      })
    }
  }
  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    )
  }
}
export default graphql(getBooksQuery)(bookList);
