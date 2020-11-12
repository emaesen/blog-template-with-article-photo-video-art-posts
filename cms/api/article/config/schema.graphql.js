module.exports = {
  query: `
    articlesCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      articlesCount: {
        description: 'Return the count of articles',
        resolverOf: 'application::article.article.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.article.services.article.count(options.where || {});
        },
      },
    },
  },
};