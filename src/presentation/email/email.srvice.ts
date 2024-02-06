import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

interface SendMailOptions {
    from: string;
    to: string;
    subject: string;
    htmlBody: string;
    //todo: attachements:
}

// todo: attachements

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendMail(options: SendMailOptions): Promise<boolean> {

        const {from, to, subject, htmlBody } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                from,
                to,
                subject,
                html: htmlBody,
            });

            console.log(sentInformation);
            return true;

        } catch (error) {

            return false;
        }

    }

}




