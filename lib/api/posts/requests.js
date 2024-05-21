import BaseApi from "@/lib/api/_base.api";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import persistentStore from "@/lib/store/persistentStore";
import Router from "next/router";
const APIDOMAIN = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";

export default class POSTAPI {
  static async create(payload) {
    try {
      const res = await BaseApi.post(APIDOMAIN + "/api/v1/posts", payload);
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async delete(payload) {
    try {
      const res = await BaseApi.delete(
        APIDOMAIN + "/api/v1/posts" + payload?.id,
        payload
      );
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async edit(payload) {
    console.log("hello", payload);
    try {
      const res = await BaseApi.put(
        APIDOMAIN + "/api/v1/posts/" + payload?.id,
        payload
      );
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async view(payload) {
    try {
      const res = await BaseApi.get(APIDOMAIN + "/api/v1/posts", payload);
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async show(payload) {
    console.log("hello show", payload?.id);
    try {
      const res = await BaseApi.get(
        APIDOMAIN + `/api/v1/posts/` + payload?.id,
        payload
      );

      console.log("ressss", res);
      return res;
    } catch (err) {
      throw err;
    }
  }
}
