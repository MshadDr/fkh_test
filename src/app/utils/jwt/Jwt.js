const jwt = require('jsonwebtoken');

class Jwt {

    /**
     *
     * @param userId
     * @returns {Promise<*>}
     */
    async generateToken(userId){
        const payload = {
            userId: userId,
        };
        const secret = process.env.SECRET_KEY;
        const expire = process.env.JWT_EXPIRE
        const options = { expiresIn: expire };

        return jwt.sign(payload, secret, options);
    }

    /**
     *
     * @param token
     * @returns {Promise<*|null>}
     */
    async getUserIdFromToken(token){
        const secret = process.env.SECRET_KEY;
        try {
            const decoded = jwt.verify(token, secret);
            return decoded.userId;
        } catch (err) {
            console.error('Invalid token');
            return null;
        }
    }
}

module.exports = new Jwt();