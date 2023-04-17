const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/weather", "/air"],
    createProxyMiddleware({
      target:
        "http://k8s-weatherw-weatherw-96e049a27a-1334965090.ap-northeast-2.elb.amazonaws.com",
      changeOrigin: true,
      headers: {
        Origin: "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    })
  );
};
