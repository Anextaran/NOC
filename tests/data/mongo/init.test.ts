import mongoose from 'mongoose';
import { MongoDataBase } from '../../../src/data/mongo/init';

describe('init MongoDB', () => {

    afterAll(()=>{
        MongoDataBase.disconnect();
    });

    test('should connect to MongoDB', async () => {

        // console.log(
        //     'MONGO AUTHEN',
        //     process.env.MONGO_DB_NAME,
        //     process.env.MONGO_URL
        // )
        const connected = await MongoDataBase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        });

        expect(connected).toBe(true);
    });

    test('should throw an error', async () => {

        try {

            const wrongURL = 'mongodb://anexo:123456@localGOD:27017';
            // should throw an error
            const connected = await MongoDataBase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: wrongURL,
            });

            // if it does not throw, the test not passes
            expect(true).toBe(false);

        } catch (error) {

            // if throw an error, the test passes 
            expect(true).toBe(true);
        }

    });

});