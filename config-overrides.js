const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@images': 'src/assets/images',
    '@views': 'src/views/',
    '@components': 'src/components'
  })(config);

  return config;
};