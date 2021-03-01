/* SAMPLE SQLITE DATABASE */
/* it's suggested to change the db folder (.tmp) on line 9 */
module.exports = ({ env }) => ({
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
