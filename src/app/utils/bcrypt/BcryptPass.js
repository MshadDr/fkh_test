const bcrypt = require('bcrypt');

class BcryptPass {

    /**
     *
     * @param pass
     * @returns {Promise<void|*>}
     */
    async hashPass(pass){
        const salt = 10
        return await bcrypt.hash(pass, salt);
    }
}

module.exports = new BcryptPass()