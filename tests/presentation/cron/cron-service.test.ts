import { CronService } from '../../../src/presentation/cron/cron-service';
describe('cron.service.test.ts , CronService', () => {

    const mockTick = jest.fn();

    // In JestJs 'done' indicates that the test
    // has finished.
    test('should create a job', (done) => {

        const job = CronService.createJob('* * * * * *', mockTick);

        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(2);
            job.stop();
            done(); // the test finishes.
        }, 2000); // every 2sec

    });
})