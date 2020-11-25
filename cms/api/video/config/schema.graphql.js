module.exports = {
  query: `
    videosCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      videosCount: {
        description: 'Return the count of videos',
        resolverOf: 'application::video.video.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.video.services.video.count(options.where || {});
        },
      },
    },
  },
};