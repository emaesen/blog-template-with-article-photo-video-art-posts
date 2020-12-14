module.exports = {
  query: `
    categoriesCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      categoriesCount: {
        description: 'Return the count of categories',
        resolverOf: 'application::category.category.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.category.services.category.count(options.where || {});
        },
      },
    },
  },
};