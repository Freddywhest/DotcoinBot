const app = require("../config/app");
const logger = require("../utils/logger");
const sleep = require("../utils/sleep");

class ApiRequest {
  constructor(session_name) {
    this.session_name = session_name;
  }

  async get_user_data(http_client) {
    try {
      const response = await http_client.post(
        `${app.apiUrl}/rest/v1/rpc/get_user_info`
      );
      return response.data;
    } catch (error) {
      const regex = /ENOTFOUND\s([^\s]+)/;
      const match = error.message.match(regex);
      logger.error(
        `${this.session_name} | Error while getting User Data: ${
          error.message.includes("ENOTFOUND") ||
          error.message.includes("getaddrinfo") ||
          error.message.includes("ECONNREFUSED")
            ? `The proxy server at ${
                match && match[1] ? match[1] : "unknown address"
              } could not be found. Please check the proxy address and your network connection`
            : error.message
        }`
      );
      await sleep(3); // Sleep for 3 seconds
    }
  }

  async upgrade_boost(http_client, boostType, data) {
    try {
      const response = await http_client.post(
        `${app.apiUrl}/rest/v1/rpc/${boostType}`,
        data
      );
      return response.data;
    } catch (error) {
      logger.error(
        `${this.session_name} | Error while <b>upgrading Boost:</b>: ${error.message}`
      );
    }
  }

  async send_taps(http_client, coins) {
    try {
      const response = await http_client.post(
        `${app.apiUrl}/rest/v1/rpc/save_coins`,
        JSON.stringify({ coins })
      );
      return response.data;
    } catch (error) {
      logger.error(
        `${this.session_name} | Error while <b>sending taps:</b> ${error.message}`
      );
    }
  }

  async try_your_luck(http_client, coins) {
    try {
      const response = await http_client.post(
        `${app.apiUrl}/rest/v1/rpc/try_your_luck`,
        JSON.stringify({ coins })
      );
      return response.data;
    } catch (error) {
      if (error?.response?.data) {
        logger.error(
          `${this.session_name} | Error while <b>trying your luck on doubling coins:</b> ${error?.response?.data?.message}`
        );
      } else {
        logger.error(
          `${this.session_name} | Error while <b>trying your luck on doubling coins:</b> ${error.message}`
        );
      }
    }
  }
}

module.exports = ApiRequest;
