const { md5 } = require("../utils");

async function deposit(client, amount, bank = "BCA", ownerName = "XSTBOT") {

  const sign = md5(client.username + client.apiKey + "deposit");

  return client.request("/v1/deposit", {
    username: client.username,
    amount,
    Bank: bank,
    owner_name: ownerName,
    sign
  });

}

module.exports = deposit;