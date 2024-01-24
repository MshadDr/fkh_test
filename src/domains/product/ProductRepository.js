const db = require('../../infrustructures/database/db')

class ProductRepository {

    /**
     *
     * @returns {Promise<*>}
     */
    async index(){
        const result = await db.query('SELECT * FROM products');
        return result.rows;
    }

    /**
     *
     * @param title
     * @param description
     * @returns {Promise<*>}
     */
    async create(title, description){
        const query = 'INSERT INTO products (title, description) VALUES ($1, $2) RETURNING *';
        const values = [title, description];

        const result = await db.query(query, values);
        return result.rows[0];
    }

    /**
     *
     * @param id
     * @param userId
     * @returns {Promise<*>}
     */
    async show(id, userId = null){

        let value = [id];

        let baseQuery = `
        SELECT p.title,
            ROUND(AVG(s.score), 2) As score,
            count(s.user_id) As user_counts
        FROM products p
        LEFT JOIN scores s ON p.id = s.product_id
        WHERE p.id = $1
        GROUP BY p.id`;

        if (userId !== null) {
            let subQuery = `
            SELECT product_id, MAX(score) AS your_score
            FROM scores
            WHERE user_id = $2 AND product_id = $1
            GROUP BY product_id`;

            baseQuery = `
            SELECT p.title,
                your_score.your_score,
                ROUND(AVG(s.score), 2) AS score,
                COUNT(s.user_id) AS user_counts
            FROM products p
            LEFT JOIN (${subQuery}) your_score ON p.id = your_score.product_id
            LEFT JOIN scores s ON p.id = s.product_id
            WHERE p.id = $1
            GROUP BY p.id, your_score.your_score`;

            value.push(userId);
        }

        const result = await db.query(baseQuery, value);
        return result.rows[0]
    }
}

module.exports = new ProductRepository();