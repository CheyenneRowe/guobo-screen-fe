const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use('/api',
        createProxyMiddleware({
            target: 'http://172.30.104.22',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            },
        })
    );
};
