module.exports = {
  purge: {
    content: ['./src/**/*.tsx'],
  },
  corePlugins: {
    container: false,
    animation: false,
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    ringOpacity: false,
  },
};
