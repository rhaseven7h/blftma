/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  i18n
};
