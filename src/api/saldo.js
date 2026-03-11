const { md5 } = require("../utils");

async function cekSaldo(client) {

  const sign = md5(client.username + client.apiKey + "depo");

  return client.request("/v1/cek-saldo", {
    cmd: "deposit",
    username: client.username,
    sign
  });

}

module.exports = cekSaldo;