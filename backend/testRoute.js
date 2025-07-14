const axios = require("axios");

const testAdminInvite = async () => {
  try {
    console.log("🔍 Testing admin invite route...");

    const response = await axios.post(
      "http://localhost:3000/api/admin/send-invite",
      {
        email: "test@example.com",
      }
    );

    console.log("✅ Route test successful:");
    console.log("Status:", response.status);
    console.log("Data:", response.data);
  } catch (error) {
    console.error("❌ Route test failed:");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    } else if (error.request) {
      console.log("No response received - is your server running?");
    } else {
      console.log("Error:", error.message);
    }
  }
};

// Test if server is running
const testServerHealth = async () => {
  try {
    const response = await axios.get("http://localhost:3000");
    console.log("✅ Server is running");
  } catch (error) {
    console.log("❌ Server might not be running on port 3000");
  }
};

console.log("=== BACKEND ROUTE TEST ===");
testServerHealth();
setTimeout(testAdminInvite, 1000);
