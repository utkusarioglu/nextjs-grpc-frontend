import { SET_ANDROID_DEFAULTS, SET_WEB_CLIENT_DEFAULTS } from "./constants";

export function setAndroidDefaults() {
  return { type: SET_ANDROID_DEFAULTS };
}

export function setWebClientDefaults() {
  return { type: SET_WEB_CLIENT_DEFAULTS };
}
