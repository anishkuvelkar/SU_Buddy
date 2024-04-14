const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
    try {
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            port: 587, 
            secure: false, 
            auth: {
                user: process.env.USER, 
                pass: process.env.PASS, 
            },
        });

        await transporter.sendMail({
            from: process.env.USER, 
            to: email,
            subject: subject,
            text: text,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email not sent!");
        console.error(error);
        return error;
    }
};
