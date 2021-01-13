module.exports = {
  query: `
    artsCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      artsCount: {
        description: 'Return the count of arts',
        resolverOf: 'application::art.art.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.art.services.art.count(options.where || {});
        },
      },
    },
  },
};