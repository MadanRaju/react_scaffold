const config = {
  dev: process.env.LOCAL,
  stage: process.env.STAGE,
  production: process.env.PRODUCTION,
  assetUrl: process.env.ASSET_URL,
};

module.exports = config;