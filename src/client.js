const request = require("./request");

const cekSaldo = require("./api/saldo");
const deposit = require("./api/deposit");
const pricelist = require("./api/pricelist");
const transaction = require("./api/transaction");
const pascabayar = require("./api/pascabayar");

class Digiflazz {

  constructor(username, apiKey, options = {}) {

    if (!username) throw new Error("username required");
    if (!apiKey) throw new Error("apiKey required");

    this.username = username;
    this.apiKey = apiKey;
    this.baseURL = options.baseURL || "https://api.digiflazz.com";

  }

  request(endpoint, payload) {
    return request(this.baseURL, endpoint, payload);
  }

  saldo() {
    return cekSaldo(this);
  }

  deposit(amount, bank, ownerName) {
    return deposit(this, amount, bank, ownerName);
  }

  pricelistPrepaid(options) {
    return pricelist.prepaid(this, options);
  }

  pricelistPasca(options) {
    return pricelist.pasca(this, options);
  }

  topup(buyerSkuCode, customerNo, refId, options) {
    return transaction.topup(this, buyerSkuCode, customerNo, refId, options);
  }

  status(buyerSkuCode, customerNo, refId) {
    return transaction.status(this, buyerSkuCode, customerNo, refId);
  }

  cekTagihan(buyerSkuCode, customerNo, refId, options) {
    return pascabayar.cekTagihan(this, buyerSkuCode, customerNo, refId, options);
  }

  bayarTagihan(buyerSkuCode, customerNo, refId, options) {
    return pascabayar.bayarTagihan(this, buyerSkuCode, customerNo, refId, options);
  }

}

module.exports = Digiflazz;