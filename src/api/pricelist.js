const { md5 } = require("../utils");

async function prepaid(client, options = {}) {

  const sign = md5(client.username + client.apiKey + "pricelist");

  return client.request("/v1/price-list", {
    cmd: "prepaid",
    username: client.username,
    sign,
    ...options
  });

}

async function pasca(client, options = {}) {

  const sign = md5(client.username + client.apiKey + "pricelist");

  return client.request("/v1/price-list", {
    cmd: "pasca",
    username: client.username,
    sign,
    ...options
  });

}

module.exports = {
  prepaid,
  pasca
};