const UserService = require('../../src/services/UserService');
const userRepository = require('../../src/domains/user/UserRepository');

jest.mock('../../src/domains/user/UserRepository');

describe('UserService', () => {
    let userService;

    beforeEach(() => {
        userService = UserService;
    });

    describe('create', () => {
        it('should call userRepository.create with provided arguments', async () => {
            const mockUsername = 'testUser';
            const mockPassword = 'testPassword';
            userRepository.create.mockResolvedValue({ /* some data */ });

            await userService.create(mockUsername, mockPassword);

            expect(userRepository.create).toHaveBeenCalledWith(mockUsername, mockPassword);
        });
    });

    describe('show', () => {
        it('should call userRepository.show with provided argument', async () => {
            const mockId = 'testId';
            userRepository.show.mockResolvedValue({ /* some data */ });

            await userService.show(mockId);

            expect(userRepository.show).toHaveBeenCalledWith(mockId);
        });
    });
});