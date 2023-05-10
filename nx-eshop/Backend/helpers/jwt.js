const { expressjwt: expressJwt } = require('express-jwt');

function authJwt() {
    console.log("Node...")
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['PUT', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['DELETE', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['PUT', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['DELETE', 'OPTIONS'] },
            { url: /\/api\/v1\/orders(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/users(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/users(.*)/, methods: ['PUT', 'OPTIONS'] },
            { url: /\/api\/v1\/users(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/v1\/users(.*)/, methods: ['DELETE', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,
            `${api}/users/get/count`,
            `${api}/orders/get/count`,
            `${api}/products/get/count`,
            `${api}/orders/get/totalsales`,
        ]
    });
}

async function isRevoked(req, payload, done) {
    console.log(req.url);
    console.log(req.method);
    if (payload.isAdmin) {
        done();
    } else if (req.url.include('orders')) {
    }

    done(null, true);
}

module.exports = authJwt;
