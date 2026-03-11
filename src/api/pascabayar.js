const { md5 } = require("../utils");

async function cekTagihan(client, buyerSkuCode, customerNo, refId, options = {}) {

  const sign = md5(client.username + client.apiKey + refId);

  return client.request("/v1/transaction", {
    commands: "inq-pasca",
    username: client.username,
    buyer_sku_code: buyerSkuCode,
    customer_no: customerNo,
    ref_id: refId,
    sign,
    ...options
  });

}

async function bayarTagihan(client, buyerSkuCode, customerNo, refId, options = {}) {

  const sign = md5(client.username + client.apiKey + refId);

  return client.request("/v1/transaction", {
    commands: "pay-pasca",
    username: client.username,
    buyer_sku_code: buyerSkuCode,
    customer_no: customerNo,
    ref_id: refId,
    sign,
    ...options
  });

}

async function statusPasca(client, buyerSkuCode, customerNo, refId, options = {}) {

  const sign = md5(client.username + client.apiKey + refId);

  return client.request("/v1/transaction", {
    commands: "status-pasca",
    username: client.username,
    buyer_sku_code: buyerSkuCode,
    customer_no: customerNo,
    ref_id: refId,
    sign,
    ...options
  });

}

module.exports = {
  cekTagihan,
  bayarTagihan,
  statusPasca
};
