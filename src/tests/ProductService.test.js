const productRepository = require('../domains/product/ProductRepository');
const scoreRepository = require('../domains/product/score/ScoreRepository');

jest.mock('../domains/product/ProductRepository');
jest.mock('../domains/product/score/ScoreRepository');

describe('ProductService', () => {
    let productService;
    beforeEach(() => {
        productService = require('../services/ProductService');
    });

    describe('index', () => {
        it('should call productRepository.index', async () => {
            await productService.index();
            expect(productRepository.index).toHaveBeenCalled();
        });
    });

    describe('create', () => {
        it('should call productRepository.create with provided arguments', async () => {
            const title = 'Test Title';
            const description = 'Test Description';

            await productService.create(title, description);

            expect(productRepository.create).toHaveBeenCalledWith(title, description);
        });
    });

    describe('show', () => {
        it('should call productRepository.show with provided arguments', async () => {
            const productId = '123';
            const userId = '456';

            await productService.show(productId, userId);

            expect(productRepository.show).toHaveBeenCalledWith(productId, userId);
        });
    });

    describe('addScore', () => {
        it('should call scoreRepository.addScore with provided arguments', async () => {
            const productId = '123';
            const userId = '456';
            const score = 5;

            await productService.addScore(productId, userId, score);

            expect(scoreRepository.addScore).toHaveBeenCalledWith(productId, userId, score);
        });
    });
});