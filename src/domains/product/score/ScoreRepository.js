const db = require('../../../infrustructures/database/db')

class ScoreRepository {

    /**
     *
     * @param productId
     * @param userId
     * @param score
     * @returns {Promise<void>}
     */
    async addScore(productId, userId, score)    {

        const checkQuery = `SELECT * FROM scores WHERE product_id = $1 AND user_id = $2`;
        const checkValues = [productId, userId];
        const values = [productId, userId, score];
        const exist = await db.query(checkQuery, checkValues);
        let query = ``;

        if (exist.rows.length > 0) {
            query = `UPDATE scores SET score = $3 WHERE product_id = $1 AND user_id = $2`;
        } else {
            query = `INSERT INTO scores (product_id, user_id, score) VALUES ($1, $2, $3)`;
        }
        db.query(query, values)
    }
}

module.exports = new ScoreRepository();