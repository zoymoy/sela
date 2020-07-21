const myCache = require("../utils/mcache.js");

exports.get = function(req, res){
    // Store the product file ??
    let productObj = myCache.get(req.params.productId);

    res.json({
        status: 200,
        message: `GET HTTP method on product/${req.params.productId} price resource`,
        data: [
            productObj
        ]
    });
}

exports.query = function(req, res){
    res.json({
        status: 200,
        message: "GET HTTP method on query resource",
        data: []
    });
}