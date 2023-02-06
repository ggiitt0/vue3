const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  devServer: {
    proxy: {
      "/api": {
        target: "https://mock.mengxuegu.com/mock/62f203c2f2652f239bd0a33f",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
