// import graphql from 'graphql';
import Book from '../models/book';
import Author from '../models/author';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  // GraphQLInt,
} from 'graphql';

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represent a book written',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return authors.find(author => author.id === book.authorId)
        return Author.findById(parent.authorId);
      }
    },
    image: { type: GraphQLNonNull(GraphQLString) }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represent Author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.findById({ authorId: parent.id });
      }
    }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'a single book',
      args: { id: { type: GraphQLString } },
      // code to get data from db/ other resource
      // resolve: (parent, args) => books.find(book => book.id === args.id)
      resolve(parent, args) {
        // return _.find(books, { id: args.id });
        return Book.findById(args.id)
      }
    },

    books: {
      type: new GraphQLList(BookType),
      description: 'List of all books',
      resolve(parent, args) {
        return Book.find({});
      }
    },
    author: {
      type: AuthorType,
      description: 'a single authors',
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id })
        return Author.findById(args.id)
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of all authors',
      resolve(parent, args) {
        return Author.find({});
      }
    }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'add book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
          image: args.image
        });
        return book.save();
      }
    },
    // Update Book
    updateBook: {
      type: BookType,
      description: 'update Book',
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        // let book = new Book({
        //   name: args.name,
        //   genre: args.genre,
        //   authorId: args.authorId
        // });
        return Book.findByIdAndUpdate(args.id, { $set: { name: args.name, genre: args.genre, authorId: args.authorId } })
      }
    },
    // Delete Book
    deleteBook: {
      type: BookType,
      description: 'Delete Book',
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Book.findByIdAndRemove(args.id)
      }
    },
    // Add Author
    addAuthor: {
      type: AuthorType,
      description: 'add Author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default schema;