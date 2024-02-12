import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs';
import { EmailService } from '../../../../src/presentation/email/email.srvice';


describe('SendEmailLogs', () => {

    
    // SendEmailLogs needs a EmailService and a LogRepository

    // same behavior as a EmailService
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    }

    // same behavior as a LogRepository
    const mockLogRepository: LogRepository = {
        getLogs: jest.fn(),
        saveLogs: jest.fn(),
    }

    const sendEmailLogs = new SendEmailLogs(
        // needs to be any, otherwise we cant pass it as a EmailService
        mockEmailService as any,
        mockLogRepository,
    );

    beforeEach(()=>{
        jest.clearAllMocks();
    })

    test('should call sendEmail and saveLogs', async () => {

        const result = await sendEmailLogs.execute('diegorodriguez999x@gmail.com');
        expect(result).toBeTruthy();
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLogs).toBeCalledWith(expect.any(LogEntity));        
        expect(mockLogRepository.saveLogs).toBeCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Log email sent",
            origin: "send-email-log.ts",
        });
    });


    test('should log in case of error',async ()=>{

        // forcing an error
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);        
        const result = await sendEmailLogs.execute('diegorodriguez999x@gmail.com');
        expect(result).toBeFalsy();
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        // the following functions will have been called anyway (in the catch(error) block), 
        expect(mockLogRepository.saveLogs).toBeCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLogs).toBeCalledWith(            
            expect.objectContaining({
                createdAt: expect.any(Date),
                level:'high',
            })
        );
    });

})