const { check, validationResult } = require('express-validator');

const setScoreSchema = [
    check('score').isInt({ min: 1, max: 5 }).withMessage('Score must be between 1 and 5'),
];

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const validateSetScore = async (req, res, next) => {
    await Promise.all(setScoreSchema.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

module.exports = {
    validateSetScore,
};