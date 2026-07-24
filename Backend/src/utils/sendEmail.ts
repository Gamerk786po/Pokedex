import nodemailer from "nodemailer"

// Creating a nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
})

// Interface of OtpPrams
interface OtpPrams{
    otp: string;
    email: string;
}

// Function for sending otp
export const sendOtp = async({otp, email}: OtpPrams): Promise<boolean> => {
    try{
        // Sending mail
        await transporter.sendMail(
            {
                from: "abdullahpper@gmail.com",
                to: email,
                subject: "Your Pokédex Verification Code",
                html: `
                  <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2>Pokédex Email Verification</h2>
                    <p>Use the following 6-digit OTP code to complete your verification:</p>
                    <h1 style="color: #e53e3e; letter-spacing: 5px;">${otp}</h1>
                    <p>This code will expire in <b>5 minutes</b>.</p>
                  </div>
                `,
              }
        )
        return true
    }catch(error){
        console.error("Email Error:", error);
        throw new Error("Something went Wrong!")
    }
}