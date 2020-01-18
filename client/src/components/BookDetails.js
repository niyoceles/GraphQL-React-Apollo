import 'dotenv/config';
import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardImgOverlay
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
  };

  toggleModalUpdating = () => {
    this.setState(prevState => ({
      ShowModalUpdate: !prevState.ShowModalUpdate
    }));
  };

  toggleModalDeleting = () => {
    this.setState(prevState => ({
      ShowModalDelete: !prevState.ShowModalDelete
    }));
  };

  displayBookDetails = () => {
    const { book } = this.props.data;
    if (book) {
      return (
        <div className='book-details' sticky='top'>
          <Button color='success' onClick={this.toggleModalUpdating}>
            Update
          </Button>
          <Button color='danger' onClick={this.toggleModalDeleting}>
            Delete
          </Button>
          <Card>
            <CardImg width='90%' className='image' src={book.image} alt='' />
            <CardImgOverlay>
              <CardTitle>
                <h1>Book Name: {book.name}</h1>{' '}
              </CardTitle>
            </CardImgOverlay>
            <CardText>Book genre: {book.genre}</CardText>
            <CardBody>Author: {book.author.name}</CardBody>
          </Card>
          <Modal
            isOpen={this.state.ShowModalUpdate}
            toggle={this.toggleModalUpdating}
          >
            <ModalHeader toggle={this.toggleModalUpdating}>
              Update Book
            </ModalHeader>
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
          <Modal
            isOpen={this.state.ShowModalDelete}
            toggle={this.toggleModalDeleting}
          >
            <ModalHeader toggle={this.toggleModalDeleting}>
              Update Book
            </ModalHeader>
            <ModalBody>
              <h3 color='warning'> Are you want delete this book?</h3>
              <DeleteBook bookId={this.props.bookId} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggleModalDeleting}>Cancel</Button>
            </ModalFooter>
          </Modal>
          {/* delete book modal end */}
        </div>
      );
    } else {
      return (
        <div className='book-details'>
          <br></br>
          <br></br>
          <br></br>
          <h1>Welcome to Book Register Application</h1>
          <h2>You can add add book</h2>
          <h2>Click on a book to view more</h2>
          <h2>You can update/Delete a book</h2>
        </div>
      );
    }
  };

  render() {
    const { showModalUpdate } = this.state;
    return showModalUpdate ? (
      <div className='update-book'>
        <UpdateBook bookId={this.props.bookId} />
      </div>
    ) : (
      <div id='book-details'>{this.displayBookDetails()}</div>
    );
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
