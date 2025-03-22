const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const typeDefs = require('./schemas/user.schema');
const resolvers = require('./resolvers/user.resolver');
const { initDB } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

const getUser = (req) => {
  const token = req.headers.authorization || '';
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const user = getUser(req);
      return { user };
    }
  });

  await server.start();
  server.applyMiddleware({ app });

  await initDB();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch(err => {
  console.error('Error starting server:', err);
});