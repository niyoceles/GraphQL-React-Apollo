import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {
  Button
} from 'reactstrap';
import { compose } from "recompose";
import { deleteBookMutation, getBookQuery } from '../queries/queries';

class DeleteBook extends Component {
  displayAuthor = () => {
    let data = this.props.getAuthorQuery;
    if (data.loading) {
      return ("Data loading");
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>)
      })
    }
  }
  onDelete = (e) => {
    e.preventDefault();
    this.props.deleteBookMutation({
      variables: {
        id: this.props.bookId,
      },
      refetchQueries: [{ query: getBookQuery }]
    });
  }

  displayBookUpdate = () => {
    const { book } = this.props.getBookQuery;
    if (book) {
      return (
        <div>
          <h1>Delete Book</h1>
          <Button color="warning" onClick={this.onDelete}>Delete</Button>
        </div>
      )
    } else {
      return (
        <div className="book-details">No Book Selected</div>
      )
    }
  }


  render() {
    return (
      <div>{this.displayBookUpdate()}</div>
    )
  }
}

// export default graphql(getAuthorQuery)(DeleteBook) if it is one only, for more than one we use compose
export default compose(
  graphql(getBookQuery, {
    name: "getBookQuery",
    options: (props) => {
      return {
        variables: {
          id: props.bookId
        }
      }
    }
  }),
  graphql(deleteBookMutation, { name: "deleteBookMutation" })
)(DeleteBook)
