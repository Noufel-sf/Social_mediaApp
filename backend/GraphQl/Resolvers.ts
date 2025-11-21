// graphql/resolvers.js
export const resolvers = {
  Query: {
    currentUser: (_, __, { user }) => { 
      return user; 
    },

    user: async (_, { id }, { models }) => {
      return models.User.findById(id);
    },

    users: async (_, __, { models }) => models.User.find(),

    recommendedUsers: async (_, __, { user, models }) => {
      return models.User.find({ _id: { $ne: user.id } }).limit(5);
    },

    friends: async (_, __, { user, models }) => {
      return models.User.find({ _id: { $in: user.friends } });
    }
  },

  Mutation: {
    register: async (_, args, { controllers }) =>
      controllers.register(args),

    login: async (_, args, { controllers }) =>
      controllers.login(args),

    logout: async (_, __, { controllers }) =>
      controllers.logout(),

    updateUserProfile: async (_, args, { controllers }) =>
      controllers.updateUserProfile(args),

    updateCoverImg: async (_, args, { controllers }) =>
      controllers.updateCoverImg(args)
  },
};


// they replace the Controllers functions with the actual logic in the controllers folder