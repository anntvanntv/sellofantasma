const nodemailer = require('nodemailer');
const { htmlToText } = require('html-to-text');
const pug = require('pug');
const path = require('path');

module.exports = class Email {
    constructor(user, products, totalPrice) {
        this.to = user.email;
        this.firstName = user.name.split(" ")[0];
        this.products = products;
        this.totalPrice = totalPrice;
        this.from = `Sello Fantasma sello.fantasma.rt@gmail.com`
    }

//create transport
 newTransport() {
    return nodemailer.createTransport({
        service: 'Brevo',
        auth: {
            user: process.env.BREVO_USERNAME,
            pass: process.env.BREVO_PASSWORD
        }
    })
 }
  //send the actual email
    async send(template, subject){
        //HTML Template
        const html = pug.renderFile(path.join(__dirname, `../views/email/${template}.pug`), {
            firstName: thisfirstName,
            products: this.products,
            subject: subject,
            totalPrice: this.totalPrice / 100
        })

        //Email Options
        const emailOptions = {
            from: this.from,
            to: this.to,
            subject: subject,
            html: html,
            text: htmlToText(html)
        }

        //send the email with transport and options
        await this.newTransport().sendMail(emailOptions);
        console.log("Email was sent...")

    }

     async sendThankYou() {
        await this.send('thankyouEmail', 'Sello Fantasma - Compra realizada')
     }
    

}