import {createTransport} from 'nodemailer'
import {email} from "../../config/index.js";
import LogService from "./log-service.js";

class EmailService extends LogService {
    constructor() {
        super();
        this.isValidate = email.host && email.pass && email.port && email.to
    }

    async log(...data) {
        console.log('email log:', ...data)
    }

    async error(...data) {
        console.log('email error:', ...data)
    }

    async sendMessage(content) {
        if (!this.isValidate) {
            return
        }

        const transporter = await createTransport({
            host: email.host,
            port: Number(email.port),
            secure: Number(email.port) === 465,
            auth: {
                user: email.user,
                pass: email.pass
            }
        })

        await transporter.sendMail({
            from: `掘金<${email.user}>`,
            to: email.to,
            subject: '掘金自动签到',
            html: this.assembledText(content)
        })
    }

    assembledText(content) {
        if (Array.isArray(content)) {
            const html = [];
            content.forEach((text) => {
                html.push(`<p>${text}</p>`);
            });
            return `<div>${html.join('')}</div>`
        } else if (typeof content === 'string') {
            return content;
        }
    }
}

export default new EmailService();
