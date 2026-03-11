const https = require("https");

function request(baseURL, endpoint, payload) {

  return new Promise((resolve, reject) => {

    const data = JSON.stringify(payload);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data)
      }
    };

    const req = https.request(baseURL + endpoint, options, (res) => {

      let body = "";

      res.on("data", (chunk) => body += chunk);

      res.on("end", () => {

        try {
          const json = JSON.parse(body);
          resolve(json);
        } catch (err) {
          reject(err);
        }

      });

    });

    req.on("error", reject);

    req.write(data);
    req.end();

  });

}

module.exports = request;