import nodemailer from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
import { promisify } from "util";
import path from "path";
// async..await is not allowed in global scope, must use a wrapper
const readFile = promisify(fs.readFile);

async function mailer(to, subject, body) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.NO_REPLY_EMAIL, // generated ethereal user
            pass: process.env.NO_REPLY_PASS, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "itsupport@amassociates.cpa", // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: body, // html body
    });

    console.log("Message sent: %s", info.messageId);
}

async function newUserAccount(p, to, subject, data) {
    let html = await readFile(process.cwd() + p, "utf8");
    let template = handlebars.compile(html);
    let body = template(data);
    mailer(to, subject, body).catch(console.error);
}

export default { newUserAccount };
