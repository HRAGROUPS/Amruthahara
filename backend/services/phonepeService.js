require("dotenv").config();

const {
  StandardCheckoutClient,
  StandardCheckoutPayRequest,
  Env,
} = require("@phonepe-pg/pg-sdk-node");

const getPhonePeConfig = () => {
  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = Number(process.env.PHONEPE_CLIENT_VERSION);
  const environmentName = (
    process.env.PHONEPE_ENVIRONMENT || process.env.PHONEPE_ENV || "SANDBOX"
  ).toUpperCase();

  return {
    clientId,
    clientSecret,
    clientVersion,
    environment:
      environmentName === "PRODUCTION" ? Env.PRODUCTION : Env.SANDBOX,
    environmentName,
  };
};

const getPhonePeClient = () => {
  const config = getPhonePeConfig();

  if (!config.clientId || !config.clientSecret || !config.clientVersion) {
    throw new Error(
      "PhonePe is not configured. Set PHONEPE_CLIENT_ID, PHONEPE_CLIENT_SECRET, and PHONEPE_CLIENT_VERSION."
    );
  }

  return StandardCheckoutClient.getInstance(
    config.clientId,
    config.clientSecret,
    config.clientVersion,
    config.environment
  );
};

module.exports = {
  getPhonePeClient,
  StandardCheckoutPayRequest,
  Env,
  getPhonePeConfig,
};