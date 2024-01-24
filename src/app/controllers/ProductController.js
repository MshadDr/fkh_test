const productService = require('../../services/ProductService')
const jwt = require('../utils/jwt/Jwt');

class ProductController {

    constructor() {
        this.show = this.show.bind(this);
        this.setScore = this.setScore.bind(this);
        this.getUserId = this.getUserId.bind(this);
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async index(req, res) {
        const products = await productService.index();
        res.json(products)
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async create(req, res) {
        try {
            const { title, description } = req.body;
            const product = await productService.create(title, description);

            return res.status(200).json({ success: true, product });
        } catch (error) {
            if (!process.env.JEST_WORKER_ID) {
                console.error(error);
            }
            return res.status(500).json({ success: false, error: 'Internal Server Error' })
        }
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async show(req, res)    {
        try {
            const userId = await this.getUserId(req.headers['authorization'])

            const productId = req.params.id;
            const product = await productService.show(productId, userId);

            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found' })
            }

            return  res.status(200).json({ success: true, product })
        } catch (error) {
            if (!process.env.JEST_WORKER_ID) {
                console.error(error);
            }
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async setScore(req, res)   {
        try {
            const userId = await this.getUserId(req.headers['authorization'])

            const productId = req.params.id;
            const { score } = req.body

            const productExist = await productService.show(productId)

            if (!productExist) {
                return res.status(404).json({ success: false, error: 'product not found' });
            }

            await productService.addScore(productId, userId, score)
            const product = await productService.show(productId, userId)

            return res.status(200).json({ success: true, product });
        } catch (error) {
            if (!process.env.JEST_WORKER_ID) {
                console.error(error);
            }
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }

    /**
     *
     * @param authHeader
     * @returns {Promise<*|null|undefined>}
     */
    async getUserId(authHeader) {
        const token = authHeader && authHeader.split(' ')[1];
        return  await jwt.getUserIdFromToken(token)
    }
}

module.exports = new ProductController();
