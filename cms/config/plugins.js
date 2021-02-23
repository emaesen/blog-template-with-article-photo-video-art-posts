module.exports = {
  //
  graphql: {
    endpoint: '/graphql',
    shadowCRUD: true,
    playgroundAlways: false,
    depthLimit: 7,
    amountLimit: 100,
    apolloServer: {
      tracing: false,
    },
  },
  upload: {
    breakpoints: {
      xxlarge: 2560,
      xlarge: 1920,
      large: 1000,
      medium: 750,
      small: 500,
      thumbnail: 64
    }
  }
};