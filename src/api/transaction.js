const { md5 } = require("../utils");

async function topup(client, buyerSkuCode, customerNo, refId, options = {}) {

  const sign = md5(client.username + client.apiKey + refId);

  return client.request("/v1/transaction", {
    username: client.username,
    buyer_sku_code: buyerSkuCode,
    customer_no: customerNo,
    ref_id: refId,
    sign,
    ...options
  });

}

async function status(client, buyerSkuCode, customerNo, refId) {

  const sign = md5(client.username + client.apiKey + refId);

  return client.request("/v1/transaction", {
    username: client.username,
    buyer_sku_code: buyerSkuCode,
    customer_no: customerNo,
    ref_id: refId,
    sign
  });

}

module.exports = {
  topup,
  status
};