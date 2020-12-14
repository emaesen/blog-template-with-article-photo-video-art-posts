module.exports = {
  query: `
    collectionsCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      collectionsCount: {
        description: 'Return the count of collections',
        resolverOf: 'application::collection.collection.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.collection.services.collection.count(options.where || {});
        },
      },
    },
  },
};