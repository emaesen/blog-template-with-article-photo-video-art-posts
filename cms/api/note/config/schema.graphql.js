module.exports = {
  query: `
    notesCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      notesCount: {
        description: 'Return the count of notes',
        resolverOf: 'application::note.note.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.note.services.note.count(options.where || {});
        },
      },
    },
  },
};