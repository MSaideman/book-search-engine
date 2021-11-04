
   
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      const foundUser = await User.findOne({_id: context.user._id}).populate("savedBooks")
      if (!foundUser) {
        throw new AuthenticationError('Cannot find a user with this id!');
      }
      return foundUser;
    }
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return{ token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Can't find this user" )
      }
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        throw new AuthenticationError('Wrong password!')
      }
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { authors, description, title, bookId, image}, context) => {

      if(context.user._id) {
        const updatedUser = await User.findOneAndUpdate(  
          { _id: context.user._id },
          { $push: { savedBooks: {authors, description, title, bookId, image} } },
          { new: true, runValidators: true })
          return updatedUser;
        }
        throw new AuthenticationError('Wrong password!')
    },

    removeBook: async (parent, {bookId}, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;