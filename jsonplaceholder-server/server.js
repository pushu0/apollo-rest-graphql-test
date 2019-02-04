import { ApolloServer, gql } from 'apollo-server';
import { JsonPlaceholderAPI } from './datasource';


const typeDefs = gql `
  type User {
    id: ID!
    name: String
    username: String
    email: String
    company: Company
  }
  type Company {
    name: String
    catchPhrase: String
    bs: String
  }
  type Query {
    users: [User]
    user(id: ID!): User    
    
  }
  type Mutation {
    editUser(id: ID!, name: String, email: String, company: String): User!
  }
`;



const resolvers = {
     Query: {
        user: (root, { id }, { dataSources }) => {                
          return dataSources.jsonPlaceholderAPI.getUser(id)
        },
       users: (root, _args, { dataSources }) => dataSources.jsonPlaceholderAPI.getAllUsers(),      
       
    },
    Mutation: {
      editUser: (root,  {id, name, email, company}, {dataSources}) => {        
        return dataSources.jsonPlaceholderAPI.editUser(id, name, email, company)
      }
    }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({    
    jsonPlaceholderAPI: new JsonPlaceholderAPI()
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
