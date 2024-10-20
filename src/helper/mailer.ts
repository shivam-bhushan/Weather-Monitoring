import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

export const sendEmail = async({email, emailType, userId}: {email: string, emailType: string, userId: string})=>{
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)


        if (emailType === 'VERIFY') {
          await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if( emailType ==='RESET') {
          await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
          }
        });

        const mailOptions = {
            from: 'shivam13202@gmail.com', 
            to: email, 
            subject: emailType === 'VERIFY'? "Verify your account": "Forgot Password", 
            html: `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType=== 'VERIFY'? 'verify your account': 'reset your password '} or paste the following ling in your browser </br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, // html body
          };

        const mailResponse = await transport.sendMail(mailOptions);   
        return mailResponse

    }catch(err){
        if(err instanceof Error){
            throw new Error(err.message)
        }
        else{
            throw new Error('Unexpeced Error')
        }
    }
}