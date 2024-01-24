const productRepository = require('../domains/product/ProductRepository')
const scoreRepository = require('../domains/product/score/ScoreRepository')

class ProductService {

    /**
     *
     * @returns {Promise<*>}
     */
    async index() {
        return  await productRepository.index();
    }

    /**
     *
     * @param title
     * @param description
     * @returns {Promise<*>}
     */
    async create(title, description) {
        return productRepository.create(title, description);
    }

    /**
     *
     * @param id
     * @param userId
     * @returns {Promise<*>}
     */
    async show(id, userId = null){
        return productRepository.show(id, userId);
    }

    /**
     *
     * @param productId
     * @param userId
     * @param score
     * @returns {Promise<void>}
     */
    async addScore(productId, userId, score){
        return scoreRepository.addScore(productId, userId, score)
    }
}

module.exports = new ProductService();