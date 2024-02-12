import { envs } from '../../config/plugins/envs.plugin'
import nodemailer from 'nodemailer';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: MailAttachment[]; // files
}

export interface MailAttachment {
    filename: string;
    path: string;
}

// Sends emails
export class EmailService {

    private transporter = nodemailer.createTransport({        
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    // Las dependendcias deberian de mandarse como propiedades,
    // pero por cuestiones educativos se ha puesto como dependencias
    // ocultas para que el testing sea mas desafiante
    constructor(){}

    async sendMail(options: SendMailOptions): Promise<boolean> {

        const { to , subject, htmlBody, attachments = [] } = options;
        try {

            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });
            // console.log(sentInformation);
            console.log("EMAIL SENT SUCCEFULLY");
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    sendEmailWithFileSystemLogs(to: string | string[]) {

        const subject = 'Logs del servidor';
        const htmlBody = `
        <h1> System Logs </h1>
        <img src= "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1"
        alt="cat" width="400px" height:"320px">
        <p> I attach the logs of this week... </p>`
        const attchmnts :MailAttachment[] = [
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
        ];

        // Regresando la promesa, quien llame a esta funcion debera manejarla con await y then...
       return this.sendMail({
            to,
            subject, 
            attachments:attchmnts,
            htmlBody,
        });
    }
}




