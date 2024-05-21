import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_API_URL;
export default class USERAPI {
  static async profile(params = "") {
    const res = await BaseApi.get(APIDOMAIN + "/api/account" + params);
    return res.data;
  }
  // static async updateProfile(payload) {
  //   const res = await BaseApi.put(APIDOMAIN + "/api/account/profile", payload);
  //   return res.data;
  // }

  static async updateProfile(payload) {
    try {
      const res = await BaseApi.put(
        APIDOMAIN + "/api/account/profile",
        payload
      );
      return res;
    } catch (err) {
      throw err;
    }
  }
  static async updateAccountSettings(payload) {
    const res = await BaseApi.put(APIDOMAIN + "/api/account/settings", payload);
    return res.data;
  }
  static async updatePassword(payload) {
    const res = await BaseApi.put(APIDOMAIN + "/api/account/password", payload);
    return res.data;
  }

  static getProfileSwr(params = "", options = {}) {
    return BaseApi.swr(APIDOMAIN + `/api/user` + params, options);
  }
}
