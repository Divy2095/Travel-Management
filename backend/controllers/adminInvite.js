const mailSender = require("../utils/mailSender");

const sendAdminInvite = async (email) => {
  // Validate email
  if (!email || !email.includes("@")) {
    throw new Error("Valid email is required");
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #0ea5e9; margin-bottom: 10px;">GoTravel Admin</h1>
        <div style="width: 50px; height: 3px; background-color: #ff9900; margin: 0 auto;"></div>
      </div>
      
      <h2 style="color: #ff9900; margin-bottom: 20px;">Hey there, future Trip Planner! 🧳</h2>
      <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">We're excited to have you join the GoTravel Admin Team.</p>
      <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">To get started, please complete your admin registration using the button below:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a 
          href="http://localhost:5173/admin-register" 
          style="display: inline-block; padding: 15px 30px; background-color: #ff9900; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          Complete Registration
        </a>
      </div>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 0.9em; color: #666; margin-bottom: 10px;">
          If you did not request this, feel free to ignore this email.
        </p>
        <p style="font-size: 0.8em; color: #999;">
          This invitation link will expire in 24 hours for security purposes.
        </p>
      </div>
    </div>
  `;

  try {
    console.log(`Attempting to send admin invite to: ${email}`);

    await mailSender(email, "Your GoTravel Admin Invitation ✈️", htmlBody);

    console.log("Admin invite email sent successfully to:", email);
    return { success: true, message: "Admin invite sent successfully" };
  } catch (error) {
    console.error("Failed to send admin invite:", error);
    throw new Error(`Failed to send admin invite: ${error.message}`);
  }
};

module.exports = sendAdminInvite;
