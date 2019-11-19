import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { compose } from "recompose";
import { getAuthorQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
    image: ''
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
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
        image: this.state.image
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.onSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input type="text"
            onChange={this.onChange}
            name="name"
            placeholder="Book name"
            value={this.state.name}
          />
        </div>
        <div className="field">
          <label>Genre name:</label>
          <input type="text"
            name="genre"
            placeholder="Genre"
            onChange={this.onChange}
            value={this.state.genre}
          />
        </div>
        <div className="field">
          <label>Image:</label>
          <input type="file"
            name="image"
            onChange={this.onChange}
            value={this.state.image}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={this.onChange} name="authorId">
            <option>Select Author</option>
            {this.displayAuthor()}
          </select>
        </div>
        <div className="field">
          <button className="btn-submit">+</button>
        </div>
      </form>
    )
  }
}

// export default graphql(getAuthorQuery)(AddBook) if it is one only, for more than one we use compose
export default compose(
  graphql(getAuthorQuery, { name: "getAuthorQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)
