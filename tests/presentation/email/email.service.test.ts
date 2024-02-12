import { EmailService, SendMailOptions } from '../../../src/presentation/email/email.srvice';
import nodemailer from 'nodemailer';
// Hardest test

describe('email.service.test.ts EmailService', () => {

    // wtf
    const mockSendMail = jest.fn();
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail,
    });

    const emailService = new EmailService();

    test('should send email', async () => {

        const options: SendMailOptions = {
            to: 'diegorodriguez999x@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        }

        await emailService.sendMail(options);
        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "Test",
            to: "diegorodriguez999x@gmail.com",
        })
    })

    test('send email with attachements', async () => {

        const email = "diegorodriguez999x@gmail.com";
        await emailService.sendEmailWithFileSystemLogs(email);
        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: expect.any(String),
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
            ]),
        });

    });

});