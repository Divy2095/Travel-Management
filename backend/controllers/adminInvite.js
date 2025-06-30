const mailSender = require("../utils/mailSender");

const sendAdminInvite = async (email) => {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #ff9900;">Hey there, future Trip Planner! 🧳</h2>
      <p>We're excited to have you join the GoTravel Admin Team.</p>
      <p>To get started, please complete your admin registration using the button below:</p>
      
      <a 
        href="http://localhost:5173/admin-register" 
        style="display: inline-block; padding: 12px 24px; background-color: #ff9900; color: white; text-decoration: none; border-radius: 8px; margin-top: 20px;">
        Complete Registration
      </a>

      <p style="margin-top: 30px; font-size: 0.9em; color: gray;">
        If you did not request this, feel free to ignore this email.
      </p>
    </div>
  `;

  try {
    await mailSender(
      email,
      "Your GoTravel Admin Invitation ✈️",
      htmlBody
    );
    console.log("Admin invite email sent successfully.");
  } catch (err) {
    console.error("Failed to send admin invite:", err);
  }
};

module.exports = sendAdminInvite;
