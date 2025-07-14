const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    console.log("=== SENDING EMAIL ===");
    console.log("To:", email);
    console.log("Subject:", title);
    console.log("Host:", process.env.MAIL_HOST);
    console.log("User:", process.env.MAIL_USER);
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port:587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection
    await transporter.verify();
    console.log("SMTP connection verified");

    // Send email
    const info = await transporter.sendMail({
      from: `"GoTravel Admin" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
    
  } catch (error) {
    console.error("Email sending failed:", error);
    
    // More specific error messages
    if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Check your email and app password.');
    } else if (error.code === 'ECONNECTION') {
      throw new Error('Cannot connect to email server. Check your internet connection.');
    } else if (error.code === 'EMESSAGE') {
      throw new Error('Invalid email message format.');
    } else {
      throw new Error(`Email error: ${error.message}`);
    }
  }
};

module.exports = mailSender;