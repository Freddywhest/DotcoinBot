const _0x1c7b55 = _0x5e75;
(function (_0x4c145b, _0x13785a) {
  const _0x393923 = _0x5e75,
    _0x1c6e32 = _0x4c145b();
  while (!![]) {
    try {
      const _0x1fc7cc =
        (parseInt(_0x393923(0x17e)) / 0x1) *
          (parseInt(_0x393923(0x155)) / 0x2) +
        (-parseInt(_0x393923(0x152)) / 0x3) *
          (-parseInt(_0x393923(0x182)) / 0x4) +
        parseInt(_0x393923(0x16c)) / 0x5 +
        (parseInt(_0x393923(0x163)) / 0x6) *
          (parseInt(_0x393923(0x15c)) / 0x7) +
        parseInt(_0x393923(0x16f)) / 0x8 +
        parseInt(_0x393923(0x14e)) / 0x9 +
        (parseInt(_0x393923(0x178)) / 0xa) *
          (-parseInt(_0x393923(0x14f)) / 0xb);
      if (_0x1fc7cc === _0x13785a) break;
      else _0x1c6e32["push"](_0x1c6e32["shift"]());
    } catch (_0x252c93) {
      _0x1c6e32["push"](_0x1c6e32["shift"]());
    }
  }
})(_0x5df7, 0x865e5);
function _0x5e75(_0xc59b5f, _0x2a6b37) {
  const _0x5df788 = _0x5df7();
  return (
    (_0x5e75 = function (_0x5e751e, _0x5717d2) {
      _0x5e751e = _0x5e751e - 0x14d;
      let _0x2cb333 = _0x5df788[_0x5e751e];
      return _0x2cb333;
    }),
    _0x5e75(_0xc59b5f, _0x2a6b37)
  );
}
const register = require(_0x1c7b55(0x189)),
  logger = require("./logger"),
  input = require(_0x1c7b55(0x17b)),
  fs = require("fs"),
  path = require(_0x1c7b55(0x172)),
  settings = require(_0x1c7b55(0x18a)),
  proxies = require(_0x1c7b55(0x156)),
  { program, Option } = require(_0x1c7b55(0x190)),
  { TelegramClient, client } = require(_0x1c7b55(0x17f)),
  Tapper = require("../core/tapper"),
  { StringSession } = require(_0x1c7b55(0x162)),
  logger2 = require("./TldLogger");
class Luncher {
  #start_text;
  constructor() {
    const _0x3a2487 = _0x1c7b55;
    this.#start_text = _0x3a2487(0x161);
  }
  #printStartText() {
    const _0x73da7a = _0x1c7b55;
    logger["info"](
      _0x73da7a(0x151) +
        this.#get_sessions()[_0x73da7a(0x165)] +
        _0x73da7a(0x16d) +
        (this.#get_proxies() && Array[_0x73da7a(0x164)](this.#get_proxies())
          ? this.#get_proxies()[_0x73da7a(0x165)]
          : 0x0) +
        _0x73da7a(0x15e)
    ),
      logger[_0x73da7a(0x173)](_0x73da7a(0x158)),
      console["log"](this.#start_text);
  }
  async [_0x1c7b55(0x18c)]() {
    const _0x3f26b9 = _0x1c7b55;
    let _0x29cd7c;
    program[_0x3f26b9(0x191)](
      new Option(_0x3f26b9(0x169), _0x3f26b9(0x175))[_0x3f26b9(0x17c)]([
        "1",
        "2",
      ])
    )[_0x3f26b9(0x176)](!![]),
      program[_0x3f26b9(0x18f)]();
    const _0x295dc2 = program[_0x3f26b9(0x170)]();
    _0x29cd7c = _0x295dc2 ? parseInt(_0x295dc2[_0x3f26b9(0x15d)]) : null;
    if (!_0x29cd7c) {
      this.#printStartText();
      let _0x2e07b6 = "";
      while (!![]) {
        _0x2e07b6 = await input["text"](
          "Enter\x20the\x20number\x20of\x20the\x20action\x20you\x20want\x20to\x20perform:\x20"
        );
        if (!_0x2e07b6[_0x3f26b9(0x174)]()[_0x3f26b9(0x15b)](/^[1-2]$/))
          logger[_0x3f26b9(0x186)]("Action\x20must\x20be\x201\x20or\x202");
        else break;
      }
      _0x29cd7c = parseInt(_0x2e07b6[_0x3f26b9(0x174)]());
    }
    if (_0x29cd7c === 0x1) register[_0x3f26b9(0x160)]();
    else {
      if (_0x29cd7c === 0x2) {
        const _0x543195 = await this.#get_tg_clients();
        await this.#run_tasks(_0x543195);
      }
    }
  }
  async #get_tg_clients() {
    const _0x218bb5 = _0x1c7b55,
      _0x517871 = this.#get_sessions(),
      _0x16ca03 = _0x517871[_0x218bb5(0x157)]((_0x5f099) => {
        const _0x48c29f = _0x218bb5;
        try {
          const _0x577940 = fs[_0x48c29f(0x188)](
            path["join"](
              process[_0x48c29f(0x166)](),
              "sessions",
              _0x5f099 + _0x48c29f(0x177)
            ),
            _0x48c29f(0x181)
          );
          if (!_0x577940) {
            logger[_0x48c29f(0x15f)](
              _0x48c29f(0x17a) + _0x5f099 + _0x48c29f(0x171)
            );
            return;
          }
          const _0x2d33e5 = JSON[_0x48c29f(0x18f)](_0x577940);
          (!settings[_0x48c29f(0x18d)] || !settings["API_HASH"]) &&
            (logger[_0x48c29f(0x15f)](
              "API_ID\x20and\x20API_HASH\x20must\x20be\x20provided."
            ),
            process[_0x48c29f(0x168)](0x1));
          (!_0x2d33e5["sessionString"] ||
            !_0x2d33e5[_0x48c29f(0x14d)] ||
            !_0x2d33e5[_0x48c29f(0x179)]) &&
            (logger[_0x48c29f(0x15f)](
              _0x48c29f(0x17a) +
                _0x5f099 +
                "</b></la>\x20|\x20Invalid\x20session\x20data.\x20Create\x20a\x20new\x20one."
            ),
            process[_0x48c29f(0x168)](0x1));
          !/^\d+$/["test"](_0x2d33e5["apiId"]) &&
            (logger[_0x48c29f(0x15f)](
              _0x48c29f(0x17a) + _0x5f099 + _0x48c29f(0x17d)
            ),
            process[_0x48c29f(0x168)](0x1));
          const _0x34c3ef = new StringSession(_0x2d33e5["sessionString"]),
            _0x3e53ac = new TelegramClient(
              _0x34c3ef,
              _0x2d33e5[_0x48c29f(0x14d)],
              _0x2d33e5[_0x48c29f(0x179)],
              {
                connectionRetries: 0x5,
                deviceModel: "Freddy\x20Bots",
                appVersion: _0x48c29f(0x184),
                systemVersion: _0x48c29f(0x184),
                langCode: "en",
                baseLogger: logger2,
              }
            );
          return { tg_client: _0x3e53ac, session_name: _0x5f099 };
        } catch (_0xfcb08b) {
          logger[_0x48c29f(0x15f)](
            _0x48c29f(0x17a) +
              _0x5f099 +
              _0x48c29f(0x16b) +
              _0xfcb08b[_0x48c29f(0x180)]
          );
        }
      });
    return _0x16ca03;
  }
  #get_sessions() {
    const _0x254cb3 = _0x1c7b55,
      _0x100b80 = path[_0x254cb3(0x18b)](
        process[_0x254cb3(0x166)](),
        _0x254cb3(0x187)
      );
    if (!fs[_0x254cb3(0x183)](_0x100b80)) return [];
    const _0x42c485 = fs[_0x254cb3(0x185)](_0x100b80)["map"]((_0x34811e) => {
      const _0x25b68a = _0x254cb3,
        _0x5f0e60 = _0x34811e[_0x25b68a(0x153)](_0x25b68a(0x177))
          ? _0x34811e[_0x25b68a(0x150)](".")[0x0]
          : null;
      return _0x5f0e60;
    });
    return _0x42c485;
  }
  #get_proxies() {
    const _0x1ebc1e = _0x1c7b55;
    if (!settings[_0x1ebc1e(0x159)]) return null;
    return proxies;
  }
  async #run_tasks(_0x361d6) {
    const _0xace925 = _0x1c7b55,
      _0x115d52 = this.#get_proxies();
    let _0x36d05f = _0x115d52 ? _0x115d52[Symbol[_0xace925(0x16e)]]() : null;
    const _0x49f48b = _0x361d6[_0xace925(0x157)](async (_0x477c02) => {
      const _0x23d341 = _0xace925,
        _0x3f44ba = _0x36d05f
          ? _0x36d05f[_0x23d341(0x16a)]()[_0x23d341(0x18e)]
          : null;
      try {
        await new Tapper(_0x477c02)[_0x23d341(0x167)](_0x3f44ba);
      } catch (_0x346ea2) {
        logger[_0x23d341(0x15f)](
          _0x23d341(0x154) + _0x346ea2[_0x23d341(0x180)]
        );
      }
    });
    await Promise["all"](_0x49f48b);
  }
}
function _0x5df7() {
  const _0x1b5cc2 = [
    "process",
    "API_ID",
    "value",
    "parse",
    "commander",
    "addOption",
    "apiId",
    "6754023dXfRGu",
    "11aGIlds",
    "split",
    "Detected\x20<lb>",
    "10977jfNMVw",
    "endsWith",
    "Error\x20in\x20task\x20for\x20tg_client:\x20",
    "67066EiRkXo",
    "../config/proxies",
    "map",
    "<ye><u><b>WARNING</b></u></ye>\x20<br\x20/>\x0a<b><bl>en:</bl></b>\x20NOT\x20FOR\x20SALE\x0a<b><bl>ru:</bl></b>\x20НЕ\x20ДЛЯ\x20ПРОДАЖИ\x0a<b><bl>es:</bl></b>\x20NO\x20VENTA\x0a<b><bl>fr:</bl></b>\x20PAS\x20À\x20VENDRE\x0a<b><bl>it:</bl></b>\x20NON\x20PER\x20VENDITA\x0a<b><bl>gh:</bl></b>\x20YƐN\x20TƆN\x0a\x0a<b>For\x20updates\x20and\x20more\x20bots\x20join\x20us:</b>\x20\x0a<la>https://t.me/freddy_bots</la>\x0a",
    "USE_PROXY_FROM_FILE",
    "exports",
    "match",
    "14rUdUXN",
    "action",
    "</pi>\x20proxies",
    "error",
    "start",
    "\x0a╔═══╗\x20\x20\x20\x20\x20╔╗\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20╔══╗\x20\x20\x20\x20\x20\x20╔╗\x20\x0a╚╗╔╗║\x20\x20\x20\x20╔╝╚╗\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20║╔╗║\x20\x20\x20\x20\x20╔╝╚╗\x0a\x20║║║║╔══╗╚╗╔╝╔══╗╔══╗╔╗╔═╗\x20║╚╝╚╗╔══╗╚╗╔╝\x0a\x20║║║║║╔╗║\x20║║\x20║╔═╝║╔╗║╠╣║╔╗╗║╔═╗║║╔╗║\x20║║\x20\x0a╔╝╚╝║║╚╝║\x20║╚╗║╚═╗║╚╝║║║║║║║║╚═╝║║╚╝║\x20║╚╗\x0a╚═══╝╚══╝\x20╚═╝╚══╝╚══╝╚╝╚╝╚╝╚═══╝╚══╝\x20╚═╝\x20\x0a©\x20Freddy\x20Bots\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0aSelect\x20an\x20action:\x0a\x0a1.\x20Create\x20session\x0a2.\x20Run\x20bot\x0a\x20\x20\x20\x20\x20",
    "telegram/sessions",
    "2916318hAnSke",
    "isArray",
    "length",
    "cwd",
    "run",
    "exit",
    "--action\x20<action>",
    "next",
    "</b></la>\x20|\x20Error:\x20",
    "2870890tFsTHB",
    "</lb>\x20sessions\x20|\x20<pi>",
    "iterator",
    "4848888TIyEvQ",
    "opts",
    "</b></la>\x20|\x20Session\x20is\x20empty\x20or\x20expired.\x20Create\x20a\x20new\x20one.",
    "path",
    "paragraph",
    "trim",
    "Action\x20type",
    "showHelpAfterError",
    ".session",
    "39786830wtLlPY",
    "apiHash",
    "<la><b>",
    "input",
    "choices",
    "</b></la>\x20|\x20Invalid\x20session\x20data.\x20Create\x20a\x20new\x20one.",
    "27AFegVj",
    "telegram",
    "message",
    "utf8",
    "788lTLRzX",
    "existsSync",
    "1.0.0",
    "readdirSync",
    "warning",
    "sessions",
    "readFileSync",
    "../core/register",
    "../config/config",
    "join",
  ];
  _0x5df7 = function () {
    return _0x1b5cc2;
  };
  return _0x5df7();
}
const luncher = new Luncher();
module[_0x1c7b55(0x15a)] = luncher;
