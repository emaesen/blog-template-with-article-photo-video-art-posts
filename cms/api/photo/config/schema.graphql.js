module.exports = {
  query: `
    photosCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      photosCount: {
        description: 'Return the count of photos',
        resolverOf: 'application::photo.photo.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.photo.services.photo.count(options.where || {});
        },
      },
    },
  },
};