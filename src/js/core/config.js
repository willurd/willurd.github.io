const envs = {
  'localhost': 'development',
  'willurd.github.io': 'production'
};

const env = envs[window.location.hostname] || 'production';
const isDevelopment = env === 'development';

const config = {
  env: env,

  debug: {
    actions: isDevelopment,
    globals: isDevelopment,
    logging: isDevelopment
  }
};

export default config;
