module.exports = {
  apps: [
    {
      name: 'website-staging',
      script: 'npm',
      args: 'run serve:ssr',
      env: {
        "NODE_ENV": "staging"
      }
    },

    {
      name: 'website-production',
      script: 'npm',
      args: 'run serve:ssr',
      env: {
        "NODE_ENV": "production"
      }
    },
  ],
};
