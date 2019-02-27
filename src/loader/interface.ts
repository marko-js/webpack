import { Buffer } from "buffer";

const KEY = "CODE";

function encodeAsHexString(string) {
  return Buffer.from(string).toString("hex");
}

function decodeHexString(string) {
  return Buffer.from(string, "hex").toString();
}

export const encode = function(code) {
  return `${KEY}=${encodeAsHexString(code)}`;
};

export const decode = function(loaderOptions) {
  return decodeHexString(loaderOptions[KEY]);
};
