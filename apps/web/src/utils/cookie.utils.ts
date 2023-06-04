export function parseCookies(cookie: string) {
  return cookie.split(";").reduce((p, c) => {
    const [keyDirty, valueDirty] = c.split("=");
    if (!valueDirty) {
      return p;
    }
    p[keyDirty.trim()] = valueDirty.trim();
    return p;
  }, {} as Record<string, string>);
}

export const cookieStorage = {
  getItem(itemName: string) {
    if (!global.window) {
      return Promise.resolve();
    }
    const cookies = parseCookies(document.cookie);
    if (!cookies || !cookies[itemName]) {
      return Promise.resolve();
    }
    return Promise.resolve(cookies[itemName]);
  },
  setItem(itemName: string, itemValue: string) {
    if (!global.window) {
      return Promise.resolve();
    }
    document.cookie = `${itemName}=${itemValue}`;
    return Promise.resolve();
  },
  removeItem(itemName: string) {
    if (!global.document) {
      return Promise.resolve();
    }
    document.cookie = `${itemName}=''`;
    return Promise.resolve();
  },
};
