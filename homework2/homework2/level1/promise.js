let isMomHappy = true;
let phone = {
  brand: "Samsung",
  color: "black",
};

var willIGetNewPhone = (param) => {
  return new Promise((resolve, reject) => {
    if (param) resolve(phone);
    else reject(new Error(`mom is not happy\n`));
  });
};

const promise = willIGetNewPhone(isMomHappy);
promise
  .then((result) => console.dir(result))
  .catch((result) =>
    console.error(`UnhandledPromiseRejectionWarning:`, result)
  );
