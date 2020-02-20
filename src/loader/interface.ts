import { Buffer } from "buffer";

const KEY = "CODE";

function encodeAsHexString(string: string): string {
  return Buffer.from(string).toString("hex");
}

function decodeHexString(string: string): string {
  return Buffer.from(string, "hex").toString();
}

export function encode(code: string): string {
  return `${KEY}=${encodeAsHexString(code)}`;
}

export function decode(loaderOptions): string {
  return decodeHexString(loaderOptions[KEY]);
}
