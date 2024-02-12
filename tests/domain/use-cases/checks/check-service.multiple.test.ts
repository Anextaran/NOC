import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckServiceMultiple } from '../../../../src/domain/use-cases/checks/check-service-multiple';


describe('check-service-multiple.ts', () => {

    const mockRepos1 = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),    
    }
    const mockRepos2 = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepos3 = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }

    const succesCallBack = jest.fn();
    const errorCallBack = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    const checkServiceMultiple = new CheckServiceMultiple(
    [mockRepos1,mockRepos2,mockRepos3], succesCallBack, errorCallBack
    );

    test('should call succesCallback when fetch success', async () => {

        const succefull = await checkServiceMultiple.execute('https://google.com');
        expect(succefull).toBe(true);
        expect(succesCallBack).toHaveBeenCalled();
        expect(errorCallBack).not.toHaveBeenCalled();
        expect(mockRepos1.saveLogs).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepos2.saveLogs).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepos3.saveLogs).toBeCalledWith(expect.any(LogEntity));
    });


    test('should call succesCallback when fetch fails', async () => {

        const succefull = await checkServiceMultiple
            .execute('https://poroongleopfijfb3489276482jhdf23782784324.com');
        expect(succefull).toBe(false);
        expect(succesCallBack).not.toHaveBeenCalled();
        expect(errorCallBack).toHaveBeenCalled();
        expect(mockRepos1.saveLogs).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepos2.saveLogs).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepos3.saveLogs).toBeCalledWith(expect.any(LogEntity));

    });

});