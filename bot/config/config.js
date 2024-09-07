require("dotenv").config();
const _isArray = require("../utils/_isArray");
const settings = {
  API_ID:
    process.env.API_ID && /^\d+$/.test(process.env.API_ID)
      ? parseInt(process.env.API_ID)
      : process.env.API_ID && !/^\d+$/.test(process.env.API_ID)
      ? "N/A"
      : undefined,
  API_HASH: process.env.API_HASH || "",

  AUTO_UPGRADE_MULTITAP: process.env.AUTO_UPGRADE_MULTITAP
    ? process.env.AUTO_UPGRADE_MULTITAP.toLowerCase() === "true"
    : true,
  MAX_MULTITAP_LEVEL: process.env.MAX_MULTITAP_LEVEL
    ? parseInt(process.env.MAX_MULTITAP_LEVEL)
    : 5,

  AUTO_UPGRADE_ATTEMPTS: process.env.AUTO_UPGRADE_ATTEMPTS
    ? process.env.AUTO_UPGRADE_ATTEMPTS.toLowerCase() === "true"
    : true,

  AUTO_CLAIM_TASKS: process.env.AUTO_CLAIM_TASKS
    ? process.env.AUTO_CLAIM_TASKS.toLowerCase() === "true"
    : true,

  MAX_ATTEMPTS: process.env.MAX_ATTEMPTS
    ? parseInt(process.env.MAX_ATTEMPTS)
    : 15,

  MIN_DTC_TO_STOP_SPIN_TO_EARN: process.env.MIN_DTC_TO_STOP_SPIN_TO_EARN
    ? parseInt(process.env.MIN_DTC_TO_STOP_SPIN_TO_EARN)
    : 20,

  SLEEP_BETWEEN_TAP:
    process.env.SLEEP_BETWEEN_TAP && _isArray(process.env.SLEEP_BETWEEN_TAP)
      ? JSON.parse(process.env.SLEEP_BETWEEN_TAP)
      : process.env.SLEEP_BETWEEN_TAP &&
        /^\d+$/.test(process.env.SLEEP_BETWEEN_TAP)
      ? parseInt(process.env.SLEEP_BETWEEN_TAP)
      : 150,

  USE_PROXY_FROM_FILE: process.env.USE_PROXY_FROM_FILE
    ? process.env.USE_PROXY_FROM_FILE.toLowerCase() === "true"
    : false,

  AUTO_PLAY_SPIN_TO_EARN: process.env.AUTO_PLAY_SPIN_TO_EARN
    ? process.env.AUTO_PLAY_SPIN_TO_EARN.toLowerCase() === "true"
    : false,

  AUTO_LUCKY_DOUBLING_COINS: process.env.AUTO_LUCKY_DOUBLING_COINS
    ? process.env.AUTO_LUCKY_DOUBLING_COINS.toLowerCase() === "true"
    : true,

  USE_QUERY_ID: process.env.USE_QUERY_ID
    ? process.env.USE_QUERY_ID.toLowerCase() === "true"
    : false,

  RANDOM_TAPS_COUNT:
    process.env.RANDOM_TAPS_COUNT && _isArray(process.env.RANDOM_TAPS_COUNT)
      ? JSON.parse(process.env.RANDOM_TAPS_COUNT)
      : [1000, 20000],
};

module.exports = settings;
