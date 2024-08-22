const { default: axios } = require("axios");
const logger = require("../utils/logger");
const headers = require("./header");
const { SocksProxyAgent } = require("socks-proxy-agent");
const settings = require("../config/config");
const app = require("../config/app");
const user_agents = require("../config/userAgents");
const fs = require("fs");
const sleep = require("../utils/sleep");
const ApiRequest = require("./api");
const { UpgradableBoostType } = require("../utils/boost");
var _ = require("lodash");

class NonSessionTapper {
  constructor(query_id, query_name) {
    this.session_name = query_name;
    this.query_id = query_id;
    this.API_URL = app.apiUrl;
    this.session_user_agents = this.#load_session_data();
    this.headers = { ...headers, "user-agent": this.#get_user_agent() };
    this.api = new ApiRequest(this.session_name);
    this.XXY_ZZY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqdm5tb3luY21jZXdudXlreWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3MDE5ODIsImV4cCI6MjAyNDI3Nzk4Mn0.oZh_ECA6fA2NlwoUamf1TqF45lrMC0uIdJXvVitDbZ8";
    this.STARTING_COIN_PRICE = 2000;
  }

  #load_session_data() {
    try {
      const data = fs.readFileSync("session_user_agents.json", "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return {};
      } else {
        throw error;
      }
    }
  }

  #get_random_user_agent() {
    const randomIndex = Math.floor(Math.random() * user_agents.length);
    return user_agents[randomIndex];
  }

  #get_user_agent() {
    if (this.session_user_agents[this.session_name]) {
      return this.session_user_agents[this.session_name];
    }

    logger.info(`${this.session_name} | Generating new user agent...`);
    const newUserAgent = this.#get_random_user_agent();
    this.session_user_agents[this.session_name] = newUserAgent;
    this.#save_session_data(this.session_user_agents);
    return newUserAgent;
  }

  #save_session_data(session_user_agents) {
    fs.writeFileSync(
      "session_user_agents.json",
      JSON.stringify(session_user_agents, null, 2)
    );
  }

  #addSeconds(seconds) {
    let currentDate = new Date();
    let newDate = new Date(currentDate.getTime() + seconds * 1000);
    return newDate;
  }

  #compareWithCurrentTime(date) {
    let currentDate = new Date();
    if (date > currentDate) {
      return true;
    } else if (date < currentDate) {
      return false;
    } else {
      return false;
    }
  }

  #proxy_agent(proxy) {
    try {
      if (!proxy) return null;
      let proxy_url;
      if (!proxy.password && !proxy.username) {
        proxy_url = `socks${proxy.socksType}://${proxy.ip}:${proxy.port}`;
      } else {
        proxy_url = `socks${proxy.socksType}://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port}`;
      }
      return new SocksProxyAgent(proxy_url);
    } catch (e) {
      logger.error(
        `${
          this.session_name
        } | Proxy agent error: ${e}\nProxy: ${JSON.stringify(proxy, null, 2)}`
      );
      return null;
    }
  }

  async #get_tg_web_data() {
    try {
      const jsonData = {
        initData: `${this.query_id}`,
        hash: null,
      };
      return jsonData;
    } catch (error) {
      logger.error(
        `${this.session_name} | ❗️Unknown error during Authorization: ${error}`
      );
      throw error;
    } finally {
      await sleep(1);
      logger.info(`${this.session_name} | 🚀 Starting session...`);
    }
  }

  async #get_access_token(tgWebData, http_client) {
    try {
      http_client.defaults.headers["authorization"] = `Bearer ${this.XXY_ZZY}`;
      const response = await http_client.post(
        `${this.API_URL}/functions/v1/getToken`,
        JSON.stringify(tgWebData)
      );

      return response.data;
    } catch (error) {
      logger.error(
        `${this.session_name} | ❗️Unknown error while getting Access Token: ${error}`
      );
      await sleep(3); // 3 seconds delay
    }
  }

  async #check_proxy(http_client, proxy) {
    try {
      http_client.defaults.headers["host"] = "httpbin.org";
      const response = await http_client.get("https://httpbin.org/ip");
      const ip = response.data.origin;
      logger.info(`${this.session_name} | Proxy IP: ${ip}`);
    } catch (error) {
      if (
        error.message.includes("ENOTFOUND") ||
        error.message.includes("getaddrinfo") ||
        error.message.includes("ECONNREFUSED")
      ) {
        logger.error(
          `${this.session_name} | Error: Unable to resolve the proxy address. The proxy server at ${proxy.ip}:${proxy.port} could not be found. Please check the proxy address and your network connection.`
        );
        logger.error(`${this.session_name} | No proxy will be used.`);
      } else {
        logger.error(
          `${this.session_name} | Proxy: ${proxy.ip}:${proxy.port} | Error: ${error.message}`
        );
      }

      return false;
    }
  }

  async run(proxy) {
    let http_client;
    let access_token_created_time = 0;
    let sleep_taps = 0;

    let profile_data;

    if (settings.USE_PROXY_FROM_FILE && proxy) {
      http_client = axios.create({
        httpsAgent: this.#proxy_agent(proxy),
        headers: this.headers,
        withCredentials: true,
      });
      const proxy_result = await this.#check_proxy(http_client, proxy);
      if (!proxy_result) {
        http_client = axios.create({
          headers: this.headers,
          withCredentials: true,
        });
      }
    } else {
      http_client = axios.create({
        headers: this.headers,
        withCredentials: true,
      });
    }
    while (true) {
      try {
        const currentTime = Date.now() / 1000;
        if (currentTime - access_token_created_time >= 3600) {
          http_client.defaults.headers["host"] = app.host;
          const tg_web_data = await this.#get_tg_web_data();
          const get_token = await this.#get_access_token(
            tg_web_data,
            http_client
          );
          http_client.defaults.headers[
            "authorization"
          ] = `Bearer ${get_token?.token}`;
          http_client.defaults.headers["Apikey"] = this.XXY_ZZY;
          access_token_created_time = currentTime;
          await sleep(2);
        }

        profile_data = await this.api.get_user_data(http_client);
        if (!profile_data) {
          continue;
        }

        //Sending Taps
        if (
          profile_data?.daily_attempts > 0 &&
          !this.#compareWithCurrentTime(sleep_taps)
        ) {
          if (settings.RANDOM_TAPS_COUNT[0] > settings.RANDOM_TAPS_COUNT[1]) {
            logger.error(
              `${this.session_name} | ❗️Invalid Random Taps Count. RANDOM_TAPS_COUNT MIN must be less than RANDOM_TAPS_COUNT MAX. Example: RANDOM_TAPS_COUNT: [10, 20]`
            );
            process.exit(1);
          }
          if (
            settings.RANDOM_TAPS_COUNT[0] > 15000 ||
            settings.RANDOM_TAPS_COUNT[1] > 20000
          ) {
            logger.error(
              `${this.session_name} | ❗️Invalid Random Taps Count. RANDOM_TAPS_COUNT MAX must be less than or equal to 20000 and RANDOM_TAPS_COUNT MIN must be less than or equal to 15000. Example: RANDOM_TAPS_COUNT: [10, 20000]`
            );
            process.exit(1);
          }
          const coins = _.random(
            settings.RANDOM_TAPS_COUNT[0],
            settings.RANDOM_TAPS_COUNT[1]
          );

          const tap_response = await this.api.send_taps(http_client, coins);

          if (tap_response?.success) {
            profile_data = await this.api.get_user_data(http_client);
            logger.success(
              `${this.session_name} | ✅ Successfully sent taps | (<gr>+${coins}</gr>) |⚡Remaining Energy: ${profile_data?.daily_attempts} | 💰Total Balance: ${profile_data?.balance}`
            );
          } else {
            logger.error(`${this.session_name} | ❗️Failed to send taps`);
          }
        }

        if (
          !this.#compareWithCurrentTime(sleep_taps) &&
          profile_data?.daily_attempts < 1
        ) {
          sleep_taps = this.#addSeconds(1200);
          logger.info(
            `${this.session_name} | ⏳ Not enough daily attempts. Sleeping for 20 minutes | 💰Total Balance: ${profile_data?.balance}`
          );
        }

        await sleep(5);

        //Try your luck

        if (
          profile_data?.gamex2_times > 0 &&
          settings.AUTO_LUCKY_DOUBLING_COINS
        ) {
          logger.info(
            `${this.session_name} | Trying your luck with coin doubling`
          );
          const coins =
            Math.floor(
              profile_data?.balance * profile_data?.gamex2_probability
            ) > 150000
              ? 150000
              : Math.floor(
                  profile_data?.balance * profile_data?.gamex2_probability
                );
          const try_your_luck_response = await this.api.try_your_luck(
            http_client,
            coins
          );

          profile_data = await this.api.get_user_data(http_client);

          if (try_your_luck_response?.success) {
            logger.success(
              `${this.session_name} | 🎉 You were lucky and got (<gr>+${
                coins * 2
              }</gr>) | 💰Total Balance: ${profile_data?.balance}`
            );
          } else {
            logger.info(
              `${this.session_name} | 😞 You weren't lucky today, we will try again tomorrow`
            );
          }
        }

        await sleep(5);

        if (
          settings.AUTO_UPGRADE_ATTEMPTS &&
          profile_data?.limit_attempts < settings.MAX_ATTEMPTS
        ) {
          const attempt_level_r = profile_data?.limit_attempts - 10;
          const attempt_level = attempt_level_r + 1;
          const attempt_level_next_level_price =
            this.STARTING_COIN_PRICE * attempt_level;
          if (profile_data?.balance >= attempt_level_next_level_price) {
            const data = {
              lvl: attempt_level,
            };
            const attempt_response = await this.api.upgrade_boost(
              http_client,
              UpgradableBoostType.ATTEMPTS,
              data
            );

            profile_data = await this.api.get_user_data(http_client);
            if (attempt_response?.success) {
              logger.info(
                `${this.session_name} | Daily attempts upgraded to <lb>${profile_data?.limit_attempts}</lb>`
              );
            }
          }
        }

        await sleep(3);

        if (
          settings.AUTO_UPGRADE_MULTITAP &&
          profile_data?.multiple_clicks < settings.MAX_MULTITAP_LEVEL
        ) {
          const multitap_level_next_level_price =
            this.STARTING_COIN_PRICE * profile_data?.multiple_clicks;
          if (profile_data?.balance >= multitap_level_next_level_price) {
            const data = {
              lvl: profile_data?.multiple_clicks,
            };
            const multitap_response = await this.api.upgrade_boost(
              http_client,
              UpgradableBoostType.MULTITAPS,
              data
            );

            profile_data = await this.api.get_user_data(http_client);
            if (multitap_response?.success) {
              logger.info(
                `${this.session_name} | Multitap upgraded to level <lb>${profile_data?.multiple_clicks}</lb>`
              );
            }
          }
        }
      } catch (error) {
        logger.error(`${this.session_name} | ❗️Unknown error: ${error}`);
      } finally {
        logger.info(
          `${this.session_name} | 😴 sleeping for ${settings.SLEEP_BETWEEN_TAP} seconds`
        );
        await sleep(settings.SLEEP_BETWEEN_TAP);
      }
    }
  }
}
module.exports = NonSessionTapper;
