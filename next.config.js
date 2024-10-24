/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { i18n } = require('./next-i18next.config');

const config = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  i18n
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withImages = require('next-images');

// noinspection JSValidateTypes
module.exports = withImages(config);
