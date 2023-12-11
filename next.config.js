/** @type {import('next').NextConfig} */

const Dotenv = require("dotenv-webpack");

const nextConfig = {
  webpackConfig: {
    plugins: [
      new Dotenv({
        // 指定要加载的 .env 文件
        // Development 模式下加载 .env.development
        // Production 模式下加载 .env.production
        path:
          process.env.NODE_ENV === "production"
            ? ".env.production"
            : ".env.development",
      }),
    ],
  },
};

module.exports = nextConfig;
