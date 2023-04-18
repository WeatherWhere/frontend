const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/weather", "/air","/tour"],
    createProxyMiddleware({
      target:
        "http://localhost:8080",
      changeOrigin: true,
      secure: true,
    })
  );
};
