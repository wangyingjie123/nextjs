// next.config.js
const withLess = require('@zeit/next-less');
module.exports = withLess({
    lessLoaderOptions: {
        javascriptEnabled: true,
        localIdentName: "[local]___[hash:base64:5]"
    }
});