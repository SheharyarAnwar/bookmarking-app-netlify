const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })
const typeDefs = gql`
  type Bookmark {
    title: String!
    link: String!
  }
  type Query {
    bookmarks: [Bookmark]!
  }
  type Mutation {
    addBookmark(title: String!, link: String!): Bookmark!
  }
`
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    bookmarks: async (parent, args) => {
      try {
        const results = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("bookmarks"))),
            q.Lambda(x => q.Get(x))
          )
        )
        const faunaResults = results.data.map(val => {
          return { ...val.data }
        })
        return faunaResults
      } catch (err) {
        throw new Error("Couldnt Get Bookmarks")
      }
    },
  },
  Mutation: {
    addBookmark: async (parent, args) => {
      try {
        const results = await client.query(
          q.Create(q.Collection("bookmarks"), {
            data: {
              title: args.title,
              link: args.link,
            },
          })
        )

        return { ...results.data, docId: results.ref.id }
      } catch (err) {
        console.log(err)
        throw new Error("Couldnt create Bookmark")
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
