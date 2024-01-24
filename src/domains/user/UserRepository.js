const db = require('../../infrustructures/database/db')

class UserRepository {

    /**
     *
     * @param username
     * @param password
     * @returns {Promise<*>}
     */
    async create(username, password){
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING users.id, users.username';
        const values = [username, password];

        const result = await db.query(query, values);
        return result.rows[0];
    }

    /**
     *
     * @param id
     * @returns {Promise<*>}
     */
    async show(id){
        const query = 'SELECT u.id, u.username FROM users u WHERE id = $1';
        const value = [id];

        const result = await db.query(query, value);
        return result.rows[0]
    }
}

module.exports = new UserRepository();