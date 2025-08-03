const braintree = require("braintree");
require("dotenv").config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const generateToken = async () => {
  try {
    // Generate client token without customer ID
    const { clientToken } = await gateway.clientToken.generate({});

    if (!clientToken) {
      throw new Error("No client token received from Braintree");
    }

    // Braintree tokens aren't standard JWTs - don't try to decode
    console.log("Generated Braintree client token");
    return clientToken;
  } catch (err) {
    console.error("Braintree token generation failed:", {
      error: err.message,
      merchantId: process.env.BRAINTREE_MERCHANT_ID?.slice(0, 4) + "...", // Partial for security
      environment: braintree.Environment.Sandbox, // Fixed: using process.env instead of undefined variable
    });
    throw new Error("Payment system unavailable. Please try again later.");
  }
};

const processPayment = async (nonce, amount) => {
  try {
    const saleRequest = {
      amount: amount.toFixed(2),
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
      descriptor: {
        name: "ASMI TRIPS*BOOKING",
        url: "asmitrips.com",
      },
    };

    console.log("Processing payment for amount:", saleRequest.amount);

    const result = await gateway.transaction.sale(saleRequest);

    if (!result.success) {
      const errorMsg =
        result.transaction?.processorResponseText ||
        result.message ||
        "Payment declined";
      console.error("Payment failed:", {
        status: result.transaction?.status,
        code: result.transaction?.processorResponseCode,
        errors: result.errors,
        message: result.message,
        transaction: result.transaction,
      });
      return {
        success: false,
        message: errorMsg,
        errors: result.errors,
        transaction: result.transaction,
      };
    }

    console.log("Payment processed successfully:", {
      transactionId: result.transaction.id,
      amount: result.transaction.amount,
    });

    return {
      success: true,
      transaction: result.transaction,
    };
  } catch (err) {
    console.error("Payment processing error:", err.message);
    throw new Error("Payment processing failed. Please try again.");
  }
};

module.exports = {
  gateway,
  generateToken,
  processPayment,
};
