const jwt = require('jsonwebtoken');
const { onUnathorized } = require('../handlers/index');

module.exports = (ctx, next) => {
    const isPublicRoute = /\/login$|\/signup$/.test(ctx.request.url);
    
    if(isPublicRoute) {
        return next();
    }

    const { authorization } = ctx.request.header;

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return onUnathorized(ctx, 'Invalid token!');        
        ctx.userId = decoded.id;
    });

    return next();
}