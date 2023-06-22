import CookieManager from "@react-native-cookies/cookies";
import { Buffer } from "buffer";

// TODO duplicate code. Same code is also used in android app
interface CookieStorage {
  getItem(itemName: string): Promise<void | string>;
  setItem(itemName: string, itemValue: string): Promise<void>;
  removeItem(itemName: string): Promise<void>;
}

// TODO duplicate code. Same code is also used in android app
export class ReduxPersistCookie {
  public static encode(stringValue: string) {
    const value = Buffer.from(stringValue).toString("base64");
    return value;
  }

  public static decode(cookie: string) {
    if (!cookie) {
      return "";
    }
    const stringified = Buffer.from(cookie, "base64").toString();
    return stringified;
  }

  /**
   * Decodes and parses the given cookie string
   * @param cookie cookie string to decode and parse
   * @returns Parsed cookie object
   */
  public static parse<T>(cookie: string): T | void {
    const decoded = this.decode(cookie);
    if (!decoded) {
      return;
    }
    const sanitized = decoded.replace(/\\"/g, "");
    return JSON.parse(sanitized);
  }
}

/**
 * @dev
 * #1 `CookieManager` library doesn't offer a platform agnostic way
 * of removing a cookie, setting cookies to empty string should work
 * okay
 */
export const cookieStorage: CookieStorage = {
  async getItem(name) {
    const cookies = await CookieManager.get(
      process.env.NEXT_PUBLIC_API_V1_URL!,
    );
    const encoded = cookies[name].value;
    const decoded = ReduxPersistCookie.decode(encoded);
    return decoded;
  },
  async setItem(name, stringValue) {
    const encoded = ReduxPersistCookie.encode(stringValue);
    await CookieManager.set(process.env.NEXT_PUBLIC_API_V1_URL!, {
      name,
      value: encoded,
      // domain: "some domain",
      // path: "/",
      version: "1",
      // expires: "2015-05-30T12:30:00.00-05:00",
    });
  },
  async removeItem(itemName) {
    return this.setItem(itemName, ""); // #1
  },
};
