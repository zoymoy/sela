const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}
app.use(bodyParser.json({verify: rawBodySaver}));
app.use(bodyParser.raw({verify: rawBodySaver, type: '*/*'}));

const reprice = require('./reprice');
const product = require('./product');

module.exports = app;

// Routes
app.post('/reprice', reprice.list);
app.get('/product/:productId/price', product.get);
app.get('/query', product.query);

if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}