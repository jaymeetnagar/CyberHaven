// import { createAdmin, getAllAdmin } from '../controllers/adminController';
//  .
// import Admin from '../models/Admin';

// jest.mock(Admin, () => ({
//     create: jest.fn(),
//     find: jest.fn(),
// }));

// describe('createAdmin', () => {
//     it('should create a new admin', async () => {
//         const mockReq = {};
//         const mockRes = {
//             send: jest.fn(),
//         };

//         await createAdmin(mockReq, mockRes);

//         expect(Admin.create).toHaveBeenCalledWith({
//             name: 'admin1',
//             password: 'admin123',
//             email: 'admin@example.com',
//         });
//         expect(mockRes.send).toHaveBeenCalledWith({ 'message': 'Admin Created.' });
//     });
// });

// describe('getAllAdmin', () => {
//     it('should get all admins', async () => {
//         const mockData = [{ name: 'admin1', email: 'admin1@example.com' }];
//         Admin.find.mockResolvedValue(mockData);
//         const mockReq = {};
//         const mockRes = {
//             send: jest.fn(),
//         };

//         await getAllAdmin(mockReq, mockRes);

//         expect(Admin.find).toHaveBeenCalled();
//         expect(mockRes.send).toHaveBeenCalledWith({ data: mockData });
//     });
// });

const { createAdmin, getAllAdmin } = require('../controllers/adminController');
const Admin = require('../models/Admin');

// Mock Admin model functions
jest.mock('../models/Admin', () => ({
    create: jest.fn(),
    find: jest.fn(),
}));

describe('createAdmin', () => {
    it('should create a new admin', async () => {
        const mockReq = {};
        const mockRes = {
            send: jest.fn(),
        };

        await createAdmin(mockReq, mockRes);

        expect(Admin.create).toHaveBeenCalledWith({
            name: 'admin1',
            password: 'admin123',
            email: 'admin@example.com',
        });
        expect(mockRes.send).toHaveBeenCalledWith({ 'message': 'Admin Created.' });
    });
});

describe('getAllAdmin', () => {
    it('should get all admins', async () => {
        const mockData = [{ name: 'admin1', email: 'admin1@example.com' }];
        Admin.find.mockResolvedValue(mockData);
        const mockReq = {};
        const mockRes = {
            send: jest.fn(),
        };

        await getAllAdmin(mockReq, mockRes);

        expect(Admin.find).toHaveBeenCalled();
        expect(mockRes.send).toHaveBeenCalledWith({ data: mockData });
    });
});
