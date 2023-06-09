// TODO duplicate code. Same code is also used in android app
interface CookieStorage {
  getItem(itemName: string): Promise<void | string>;
  setItem(itemName: string, itemValue: string): Promise<void>;
  removeItem(itemName: string): Promise<void>;
}

export function parseBrowserCookies(cookie: string) {
  return cookie.split(";").reduce((p, c) => {
    const [keyDirty, valueDirty] = c.split("=");
    if (!valueDirty) {
      return p;
    }
    p[keyDirty.trim()] = valueDirty.trim();
    return p;
  }, {} as Record<string, string>);
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

export const cookieStorage: CookieStorage = {
  async getItem(itemName: string) {
    if (!global.window) {
      return Promise.resolve();
    }
    const cookies = parseBrowserCookies(document.cookie);
    if (!cookies || !cookies[itemName]) {
      return Promise.resolve();
    }
    const decoded = ReduxPersistCookie.decode(cookies[itemName]);
    return Promise.resolve(decoded);
  },
  async setItem(itemName: string, itemValue: string) {
    if (!global.window) {
      return Promise.resolve();
    }
    const encoded = ReduxPersistCookie.encode(itemValue);
    document.cookie = `${itemName}=${encoded}`;
    return Promise.resolve();
  },
  async removeItem(itemName: string) {
    if (!global.document) {
      return Promise.resolve();
    }
    document.cookie = `${itemName}=''`;
    return Promise.resolve();
  },
};
