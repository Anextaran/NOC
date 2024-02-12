import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckService } from '../../../../src/domain/use-cases/checks/check-service';


describe('CheckService UseCase', () => {

    const mockRepository = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }

    const succesCallBack = jest.fn();
    const errorCallBack = jest.fn();

    const checkService = new CheckService(
        mockRepository, succesCallBack, errorCallBack
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call succesCallback when fetch success', async () => {

        const succefull = await checkService.execute('https://google.com');
        expect(succefull).toBe(true);
        expect(succesCallBack).toHaveBeenCalled();
        expect(errorCallBack).not.toHaveBeenCalled();
        expect(mockRepository.saveLogs).toBeCalledWith(
            expect.any(LogEntity)
        )

    });

    test('should call succesCallback when fetch fails', async () => {

        const succefull = await checkService
            .execute('https://poroongleopfijfb3489276482jhdf23782784324.com');
        expect(succefull).toBe(false);
        expect(succesCallBack).not.toHaveBeenCalled();
        expect(errorCallBack).toHaveBeenCalled();
        expect(mockRepository.saveLogs).toBeCalledWith(
            expect.any(LogEntity)
        )
        
    });
});