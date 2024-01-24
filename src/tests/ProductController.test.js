const ProductController = require('../app/controllers/ProductController'); // Adjust the path accordingly
const ProductService = require('../../src/services/ProductService');
const jwt = require('../app/utils/jwt/Jwt');

jest.mock('../../src/services/ProductService', () => ({
    index: jest.fn(),
    create: jest.fn(),
    show: jest.fn(),
    addScore: jest.fn(),
}));
jest.mock('../app/utils/jwt/Jwt');

describe('ProductController', () => {
    let productController;

    beforeEach(() => {
        productController = ProductController;
    });

    describe('index', () => {
        it('should call ProductService.index and respond with products', async () => {
            const mockProducts = [{ id: 1, title: 'Product 1' }];
            ProductService.index.mockResolvedValue(mockProducts);

            const mockResponse = {
                json: jest.fn()
            };
            await productController.index({}, mockResponse);

            expect(ProductService.index).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
        });
    });

    describe('create', () => {
        it('should call ProductService.create with provided arguments and respond with success', async () => {
            const mockRequest = {
                body: { title: 'Test Title', description: 'Test Description' }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            ProductService.create.mockResolvedValue({ success: true, product: {} });

            await productController.create(mockRequest, mockResponse);

            expect(ProductService.create).toHaveBeenCalledWith('Test Title', 'Test Description');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true, product: { product: {}, success: true } });
        });

        it('should handle errors and respond with internal server error', async () => {
            const mockRequest = {
                body: { title: 'Test Title', description: 'Test Description' }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            ProductService.create.mockRejectedValue(new Error('Some error'));

            await productController.create(mockRequest, mockResponse);

            expect(ProductService.create).toHaveBeenCalledWith('Test Title', 'Test Description');
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: false, error: 'Internal Server Error' });
        });
    });
});