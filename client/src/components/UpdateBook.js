import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { compose } from "recompose";
import { getAuthorQuery, updateBookMutation, getBookQuery } from '../queries/queries';

class UpdateBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
    // image: ''
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

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
  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateBookMutation({
      variables: {
        id: this.props.bookId,
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
        // image: this.state.image
      },
      refetchQueries: [{ query: getBookQuery }]
    });
  }

  displayBookUpdate = () => {
    const { book } = this.props.getBookQuery;
    if (book) {
      return (
        <div>
          <h1>Update Book</h1>
          <form id="update-book" onSubmit={this.onSubmit}>
            <div className="field">
              <label>Book name:</label>
              <input type="text"
                onChange={this.onChange}
                name="name"
                placeholder={book.name}
                value={this.state.name}
              />
            </div>
            <div className="field">
              <label>Genre name:</label>
              <input type="text"
                name="genre"
                placeholder={book.name}
                onChange={this.onChange}
                value={this.state.genre}
              />
            </div>
            {/* <div className="field">
              <label>Image:</label>
              <input type="file"
                name="image"
                onChange={this.onChange}
                value={this.state.image}
              />
            </div> */}
            <div className="field">
              <label>Author:</label>
              <select onChange={this.onChange} name="authorId">
                <option>Select Author</option>
                {this.displayAuthor()}
              </select>
            </div>
            <div className="field">
              <button className="btn-update">Update</button>
            </div>
          </form>
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

// export default graphql(getAuthorQuery)(UpdateBook) if it is one only, for more than one we use compose
export default compose(
  graphql(getAuthorQuery, { name: "getAuthorQuery" }),
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
  graphql(updateBookMutation, { name: "updateBookMutation" })
)(UpdateBook)
