const userRepository = require('../domains/user/UserRepository')

class UserService {
    /**
     *
     * @param username
     * @param password
     * @returns {Promise<*>}
     */
    async create(username, password) {
        return userRepository.create(username, password);
    }

    /**
     *
     * @param id
     * @returns {Promise<*>}
     */
    async show(id){
        return userRepository.show(id);
    }
}

module.exports = new UserService();