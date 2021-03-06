import 'dotenv/config';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dropzone from 'react-dropzone';
import { compose } from 'recompose';
import axios from 'axios';
import {
  getAuthorQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

import { Form } from 'reactstrap';

const {
  REACT_APP_CLOUDINARY_NAME,
  REACT_APP_CLOUDINARY_API_KEY,
  REACT_APP_CLOUDINARY_UPLOAD_PRESET
} = process.env;
class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
    file: null,
    showModalAddBook: false,
    showSuccessAlert: false
  };

  toggleModalAddBook = () => {
    this.setState(prevState => ({
      showModalAddBook: !prevState.showModalAddBook
    }));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  displayAuthor = () => {
    let data = this.props.getAuthorQuery;
    if (data.loading) {
      return 'Data loading';
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  displayAlert = () => {
    return alert('Success created book!');
  };

  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `celestin, Book, image`);
      formData.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Replace the preset name with your own
      formData.append('api_key', REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_NAME}/image/upload`,
          formData
        )
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future
          localStorage.setItem('imageUrl', fileURL);
          console.log(fileURL);
        })
        .catch(error => console.log('Can’t upload ' + error));
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
      console.log('Uploaded');
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
        image: localStorage.getItem('imageUrl')
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    localStorage.removeItem('imageUrl');
    this.displayAlert();
    this.toggleModalAddBook();
  };

  render() {
    return (
      <div>
        <Button
          color='primary'
          className='add-button'
          onClick={this.toggleModalAddBook}
        >
          <h3>Add book</h3>
        </Button>
        <Modal
          isOpen={this.state.showModalAddBook}
          toggle={this.toggleModalAddBook}
        >
          <ModalHeader toggle={this.toggleModalAddBook}>Add Book</ModalHeader>
          <Form className='form' onSubmit={this.onSubmit}>
            <ModalBody>
              <span>
                <h3>Fill the form to add Book</h3>
              </span>
              <div className='field'>
                <label>Book name:</label>
                <input
                  type='text'
                  onChange={this.onChange}
                  name='name'
                  placeholder='Book name'
                  value={this.state.name}
                  required
                />
              </div>
              <div className='field'>
                <label>Genre name:</label>
                <input
                  type='text'
                  name='genre'
                  placeholder='Genre'
                  onChange={this.onChange}
                  value={this.state.genre}
                  required
                />
              </div>
              <div className='field'>
                <Dropzone
                  onDrop={this.handleDrop}
                  multiple={true}
                  accept='image/*'
                >
                  {({ getRootProps, getInputProps, isDragActive }) => {
                    return (
                      <div
                        {...getRootProps()}
                        className={
                          'dropzone' + isDragActive ? ' dropzone--isActive' : ''
                        }
                      >
                        <input {...getInputProps()} required />
                        {isDragActive ? (
                          <p className='dropzone'>Drop files here...</p>
                        ) : (
                          <p className='dropzone'>
                            Drop file here, or click to select files to upload.
                          </p>
                        )}
                      </div>
                    );
                  }}
                </Dropzone>
              </div>
              <div className='field'>
                <label>Author:</label>
                <select onChange={this.onChange} name='authorId' required>
                  <option>Select Author</option>
                  {this.displayAuthor()}
                </select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' onClick={this.toggleModalAddBook}>
                Cancel
              </Button>
              <br></br>
              <Button color='primary'>Add Book</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorQuery, { name: 'getAuthorQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
