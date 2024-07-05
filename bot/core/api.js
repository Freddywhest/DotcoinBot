const _0x31c51f = _0x240f;
(function (_0x43f6b4, _0x6e92f8) {
  const _0x21f75f = _0x240f,
    _0x7cae39 = _0x43f6b4();
  while (!![]) {
    try {
      const _0x296eb9 =
        (parseInt(_0x21f75f(0x1db)) / 0x1) *
          (parseInt(_0x21f75f(0x1ea)) / 0x2) +
        -parseInt(_0x21f75f(0x1f0)) / 0x3 +
        (-parseInt(_0x21f75f(0x1e3)) / 0x4) *
          (-parseInt(_0x21f75f(0x1dd)) / 0x5) +
        (parseInt(_0x21f75f(0x1d3)) / 0x6) *
          (parseInt(_0x21f75f(0x1e5)) / 0x7) +
        parseInt(_0x21f75f(0x1ed)) / 0x8 +
        (-parseInt(_0x21f75f(0x1d0)) / 0x9) *
          (-parseInt(_0x21f75f(0x1e6)) / 0xa) +
        -parseInt(_0x21f75f(0x1f1)) / 0xb;
      if (_0x296eb9 === _0x6e92f8) break;
      else _0x7cae39["push"](_0x7cae39["shift"]());
    } catch (_0x1e0022) {
      _0x7cae39["push"](_0x7cae39["shift"]());
    }
  }
})(_0x1a57, 0x91724);
const app = require("../config/app"),
  logger = require(_0x31c51f(0x1d6)),
  sleep = require(_0x31c51f(0x1da));
class ApiRequest {
  constructor(_0x2db34d) {
    const _0x1bcb5c = _0x31c51f;
    this[_0x1bcb5c(0x1de)] = _0x2db34d;
  }
  async ["get_user_data"](_0x2d1a05) {
    const _0x13eabc = _0x31c51f;
    try {
      const _0x38259a = await _0x2d1a05[_0x13eabc(0x1d2)](
        app[_0x13eabc(0x1ef)] + "/rest/v1/rpc/get_user_info"
      );
      return _0x38259a["data"];
    } catch (_0x3c012b) {
      const _0x1c2a45 = /ENOTFOUND\s([^\s]+)/,
        _0x35f9e1 = _0x3c012b[_0x13eabc(0x1dc)][_0x13eabc(0x1d7)](_0x1c2a45);
      logger[_0x13eabc(0x1d1)](
        this[_0x13eabc(0x1de)] +
          "\x20|\x20Error\x20while\x20getting\x20User\x20Data:\x20" +
          (_0x3c012b[_0x13eabc(0x1dc)][_0x13eabc(0x1f2)](_0x13eabc(0x1e0)) ||
          _0x3c012b[_0x13eabc(0x1dc)][_0x13eabc(0x1f2)](_0x13eabc(0x1e7)) ||
          _0x3c012b[_0x13eabc(0x1dc)][_0x13eabc(0x1f2)](_0x13eabc(0x1eb))
            ? _0x13eabc(0x1d4) +
              (_0x35f9e1 && _0x35f9e1[0x1]
                ? _0x35f9e1[0x1]
                : _0x13eabc(0x1d9)) +
              _0x13eabc(0x1d5)
            : _0x3c012b[_0x13eabc(0x1dc)])
      ),
        await sleep(0x3);
    }
  }
  async [_0x31c51f(0x1ec)](_0x133212, _0x9561c8, _0x2387a3) {
    const _0x2605ba = _0x31c51f;
    try {
      const _0x27bc93 = await _0x133212[_0x2605ba(0x1d2)](
        app["apiUrl"] + _0x2605ba(0x1df) + _0x9561c8,
        _0x2387a3
      );
      return _0x27bc93["data"];
    } catch (_0x31a6fb) {
      logger[_0x2605ba(0x1d1)](
        this[_0x2605ba(0x1de)] + _0x2605ba(0x1e4) + _0x31a6fb[_0x2605ba(0x1dc)]
      );
    }
  }
  async [_0x31c51f(0x1e1)](_0x3605a6, _0x2e10a0) {
    const _0x373b8d = _0x31c51f;
    try {
      const _0x6d39 = await _0x3605a6[_0x373b8d(0x1d2)](
        app[_0x373b8d(0x1ef)] + _0x373b8d(0x1ee),
        JSON[_0x373b8d(0x1cf)]({ coins: _0x2e10a0 })
      );
      return _0x6d39["data"];
    } catch (_0x19da80) {
      logger["error"](
        this[_0x373b8d(0x1de)] + _0x373b8d(0x1d8) + _0x19da80[_0x373b8d(0x1dc)]
      );
    }
  }
  async [_0x31c51f(0x1e9)](_0x3ab1fc, _0x7b6377) {
    const _0x35e21a = _0x31c51f;
    try {
      const _0x3bbfbd = await _0x3ab1fc[_0x35e21a(0x1d2)](
        app["apiUrl"] + "/rest/v1/rpc/try_your_luck",
        JSON["stringify"]({ coins: _0x7b6377 })
      );
      return _0x3bbfbd[_0x35e21a(0x1e8)];
    } catch (_0x769be4) {
      _0x769be4?.[_0x35e21a(0x1e2)]?.[_0x35e21a(0x1e8)]
        ? logger[_0x35e21a(0x1d1)](
            this["session_name"] +
              "\x20|\x20Error\x20while\x20<b>trying\x20your\x20luck\x20on\x20doubling\x20coins:</b>\x20" +
              _0x769be4?.[_0x35e21a(0x1e2)]?.["data"]?.[_0x35e21a(0x1dc)]
          )
        : logger[_0x35e21a(0x1d1)](
            this["session_name"] +
              "\x20|\x20Error\x20while\x20<b>trying\x20your\x20luck\x20on\x20doubling\x20coins:</b>\x20" +
              _0x769be4[_0x35e21a(0x1dc)]
          );
    }
  }
}
function _0x240f(_0x6d66a4, _0x1baae8) {
  const _0x1a57f7 = _0x1a57();
  return (
    (_0x240f = function (_0x240fe9, _0x37e9ad) {
      _0x240fe9 = _0x240fe9 - 0x1cf;
      let _0x443589 = _0x1a57f7[_0x240fe9];
      return _0x443589;
    }),
    _0x240f(_0x6d66a4, _0x1baae8)
  );
}
module["exports"] = ApiRequest;
function _0x1a57() {
  const _0x280707 = [
    "stringify",
    "9HuAnMq",
    "error",
    "post",
    "1500942VJALON",
    "The\x20proxy\x20server\x20at\x20",
    "\x20could\x20not\x20be\x20found.\x20Please\x20check\x20the\x20proxy\x20address\x20and\x20your\x20network\x20connection",
    "../utils/logger",
    "match",
    "\x20|\x20Error\x20while\x20<b>sending\x20taps:</b>\x20",
    "unknown\x20address",
    "../utils/sleep",
    "3ifulKo",
    "message",
    "4434230FpSjFZ",
    "session_name",
    "/rest/v1/rpc/",
    "ENOTFOUND",
    "send_taps",
    "response",
    "4eLFfrN",
    "\x20|\x20Error\x20while\x20<b>upgrading\x20Boost:</b>:\x20",
    "21EIKJKs",
    "5277720TguMkw",
    "getaddrinfo",
    "data",
    "try_your_luck",
    "507978jgKOJL",
    "ECONNREFUSED",
    "upgrade_boost",
    "7340608jsisbI",
    "/rest/v1/rpc/save_coins",
    "apiUrl",
    "330165OudxHe",
    "34527119xOajvE",
    "includes",
  ];
  _0x1a57 = function () {
    return _0x280707;
  };
  return _0x1a57();
}
