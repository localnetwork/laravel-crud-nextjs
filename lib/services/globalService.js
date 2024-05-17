import { parseCookies } from "nookies";

import Jsona from "jsona";
const dataFormatter = new Jsona();

export function deserialize(data) {
  return dataFormatter.deserialize(data);
}

const cookies = parseCookies();
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";

export const auth = cookies?.[TOKEN] ? true : false;

export function sortBlocks(list) {
  return list.sort((a, b) => a.order - b.order);
}

export function paramsToString(params) {
  return params
    ? Object.keys(params)
        .map((key, index) => {
          if (Array.isArray(params[key]))
            return params[key]
              .map((value, i) => `${key}[${i}]=${value}`)
              .join("&");
          else return `${key}=${Object.values(params)[index]}`;
        })
        .join("&")
    : null;
}
