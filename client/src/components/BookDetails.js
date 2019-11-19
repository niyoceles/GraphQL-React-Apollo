import 'dotenv/config';
import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { getBookQuery } from '../queries/queries';
import { graphql } from 'react-apollo';
import UpdateBook from './UpdateBook';
import DeleteBook from './DeleteBook';


// const { REACT_APP_CLOUDINARY_NAME } = process.env;
class BookDetails extends Component {
  state = {
    selected: null,
    ShowModalUpdate: false,
    ShowModalDelete: false
  }

  toggleModalUpdating = () => {
    this.setState(prevState => ({
      ShowModalUpdate: !prevState.ShowModalUpdate,
    }));
  }

  toggleModalDeleting = () => {
    this.setState(prevState => ({
      ShowModalDelete: !prevState.ShowModalDelete,
    }));
  }

  displayBookDetails = () => {
    const { book } = this.props.data;
    if (book) {
      return (
        <div className="book-details">
          <Button color="success" onClick={this.toggleModalUpdating}>Update</Button>
          <Button color="danger" onClick={this.toggleModalDeleting}>Delete</Button>
          <h2>Book Name: {book.name}</h2>
          <p>Book genre: {book.genre}</p>
          <p>Author: {book.author.name}</p>
          {/* Updating book modal start */}
          <Modal isOpen={this.state.ShowModalUpdate} toggle={this.toggleModalUpdating}>
            <ModalHeader toggle={this.toggleModalUpdating}>Update Book</ModalHeader>
            <ModalBody>
              <UpdateBook bookId={this.props.bookId} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggleModalUpdating}>Update</Button>{' '}
              <Button onClick={this.toggleModalUpdating}>Cancel</Button>
            </ModalFooter>
          </Modal>
          {/* Updating book modal end */}
          {/* delete book modal start */}
          <Modal isOpen={this.state.ShowModalDelete} toggle={this.toggleModalDeleting}>
            <ModalHeader toggle={this.toggleModalDeleting}>Update Book</ModalHeader>
            <ModalBody>
              <h3 color="warning"> Are you want delete this book?</h3>
              <DeleteBook bookId={this.props.bookId} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggleModalDeleting}>Delete</Button>{' '}
              <Button onClick={this.toggleModalDeleting}>Cancel</Button>
            </ModalFooter>
          </Modal>
          {/* delete book modal end */}
        </div>
      )
    } else {
      return (
        <div className="book-details">No Book Selected</div>
      )
    }
  }

  render() {
    const { showModalUpdate } = this.state
    return showModalUpdate ? (
      <div className="update-book">
        <UpdateBook bookId={this.props.bookId} />
      </div>
    ) : (
        <div id="book-details">
          {this.displayBookDetails()}
        </div >
      )
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);