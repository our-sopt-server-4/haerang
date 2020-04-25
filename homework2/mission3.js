const crypto = require("crypto");
const fs = require("fs");

var password = "";
var hashed = "";
fs.readFile(`password.txt`, (err, data) => {
  if (err) return console.log(err.message);
  password = data;
});

const encrypt = (salt, password) => {
  crypto.pbkdf2(
    password,
    salt.toString(),
    1,
    32,
    "sha512",
    (err, derivedKey) => {
      if (err) throw err;
      hashed = derivedKey.toString("hex");
      console.log("salt: ", salt);
      console.log("hashed: ", hashed);
      fs.writeFile(`hashed.txt`, hashed, (err, data) => {
        if (err) return console.log(err.message);
        // console.log(`after written:`, data);
      });
    }
  );
};

const salt = crypto.randomBytes(32).toString("hex");
encrypt(salt, password);
