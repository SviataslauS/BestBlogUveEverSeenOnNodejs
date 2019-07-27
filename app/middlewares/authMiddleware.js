
const authCookieName = 'authentication';
const nonSecurePaths = [
    '/api',
    '/api/',
    '/',
    '/health/ping',
    '/login',
    '/logout',
    '/worker/statistic',
];

function authMiddleware (req, res, next) {
    if (nonSecurePaths.includes(req.originalUrl) ) {
        return next();
    }

    const authCookie = (req.cookies)[authCookieName];
    return authCookie
            ? next()
            : res.status(401).send('Unauthorized');
}

module.exports = { authMiddleware, authCookieName };