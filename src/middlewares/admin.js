const jwt = require('jsonwebtoken');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

function extractToken(bearerToken) {
    return bearerToken.split(' ')[1];
}

const validateAdmin = async (req, res, next) => {
    const authorizationToken = req.headers.authorization;

    if (!authorizationToken) {
        return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ error: { message: 'Token not found' } });
    }

    const token = extractToken(authorizationToken);
    
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, secret);

    if (decoded.data.admin !== true) {
        return res.status(mapStatusHTTP('FORBIDDEN'))
        .json({ error: { message: 'Restricted access' } });     
    }

    next();
};

module.exports = validateAdmin;