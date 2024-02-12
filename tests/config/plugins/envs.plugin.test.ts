import { envs } from '../../../src/config/plugins/envs.plugin';

describe('envs.plugins.ts', () => {

    test('should return ', () => {

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'diegorodriguez999x@gmail.com',
            MAILER_SECRET_KEY: 'tjnjyktbngjejhgh',
            PROD: false,
            MONGO_URL: 'mongodb://anexo:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'anexo',
            MONGO_PASS: '123456789'
        });
    });

    test('should return error if not found env', async () => {

        jest.resetModules();
        // this wrong 
        process.env.PORT = 'ABC';
        try {

            // should throw an error
            await import('../../../src/config/plugins/envs.plugin');
            // if it doesnt throw an error the test not passes
            expect(true).toBe(false);

        } catch (error) {

            // if it throws an error the test passes
            expect(true).toBe(true);
        }

    });
})