module.exports = {
  query: `
    threadsCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      threadsCount: {
        description: 'Return the count of threads',
        resolverOf: 'application::thread.thread.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.thread.services.thread.count(options.where || {});
        },
      },
    },
  },
};