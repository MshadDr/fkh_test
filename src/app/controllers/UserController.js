const userService = require('../../services/UserService');
const bcryptPass = require('../utils/bcrypt/BcryptPass');
const jwt = require('../utils/jwt/Jwt');

class UserController {

    constructor() {
        this.show = this.show.bind(this);
        this.create = this.create.bind(this);
        this.getUserToken = this.getUserToken.bind(this);
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async show(req, res) {
        try {
            const userId = req.params.id;
            const user = await userService.show(userId);

            user.token = await this.getUserToken(user.id)

            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' })
            }

            return  res.status(200).json({ success: true, user })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async create(req, res){
        try {
            const { username, password } = req.body;
            const hashPass = await bcryptPass.hashPass(password)

            const user = await userService.create(username, hashPass);
            user.token = await this.getUserToken(user.id)

            return res.status(200).json({ success: true, user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Internal Server Error' })
        }
    }

    /**
     *
     * @param userId
     * @returns {Promise<*>}
     */
    async getUserToken(userId){
        return await jwt.generateToken(userId)
    }
}

module.exports = new UserController();