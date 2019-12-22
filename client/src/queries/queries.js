import { gql } from 'apollo-boost';

const getBooksQuery = gql`
{
  books{
    name,
    id,
    author{
      name
      id
    }
  }
}
`
const addBookMutation = gql`
mutation($name:String!,$genre:String!,$authorId:String!, $image:String!) {
  addBook(name:$name, genre:$genre, authorId:$authorId, image:$image){
    name
    id
  }
}
`
const updateBookMutation = gql`
mutation($id:String!, $name:String!,$genre:String!,$authorId:String!) {
  updateBook(id:$id, name:$name, genre:$genre, authorId:$authorId){
    name
    genre
    id
  }
}
`
const deleteBookMutation = gql`
mutation($id:String!) {
  deleteBook(id:$id){
    name
    genre
    id
  }
}
`

const getAuthorQuery = gql`
{
  authors{
    name,
    id
  }
}
`

const getBookQuery = gql`
query($id: String){
  book(id:$id){
    id
    name
    genre
    author{
      id
      name
    }
    image
  }
}
`
export {
  getBooksQuery,
  getAuthorQuery,
  addBookMutation,
  updateBookMutation,
  deleteBookMutation,
  getBookQuery
};