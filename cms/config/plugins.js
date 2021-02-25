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
    quality: 40,
    progressive: true,
    breakpoints: {
      w3300: 3300,
      w2520: 2520,
      w2200: 2200,
      w1680: 1680,
      w1100: 1100,
      w840: 840,
      w550: 550,
      w370: 370,
      w275: 275,
      w220: 220
    }
  }
};