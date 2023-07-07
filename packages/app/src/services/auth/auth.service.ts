import {
  LoginWithUserPassArgs,
  LoginWithUserPassReturn,
  LoginWithAuthIdArgs,
  LoginWithAuthIdReturn,
  LogoutWithAuthIdArgs,
  LogoutWithAuthIdReturn,
} from "./auth.service.types";

export const ENABLE_KEYWORDS = true;
export const ERROR_KEYWORD = "error";
export const GUEST_KEYWORD = "guest";
export const WRONG_CREDS_KEYWORD = "wrong";

export class AuthService {
  /**
   * Validates user login through username and password
   * @param param0 user credentials (username, password)
   * @returns Authentication object, this is called "session" in some
   * products.
   * @dev
   * #1 This is here for testing purposes
   * #2 This is where the actual validation logic will go
   */
  public async loginWithUserPass(
    ...[{ username, password }]: LoginWithUserPassArgs
  ): Promise<LoginWithUserPassReturn> {
    try {
      // #1
      if (ENABLE_KEYWORDS) {
        if (
          ERROR_KEYWORD &&
          username === ERROR_KEYWORD &&
          password === ERROR_KEYWORD
        ) {
          throw new Error("USER_PASS_IS_ERROR");
        }
        if (
          GUEST_KEYWORD &&
          username === GUEST_KEYWORD &&
          password === GUEST_KEYWORD
        ) {
          return Promise.resolve({
            authId: GUEST_KEYWORD,
            username: GUEST_KEYWORD,
          });
        }
        if (
          WRONG_CREDS_KEYWORD &&
          username === WRONG_CREDS_KEYWORD &&
          password === WRONG_CREDS_KEYWORD
        ) {
          return Promise.resolve({
            authId: "",
            username: "",
          });
        }
      }

      // #2
      return Promise.resolve({
        authId: "",
        username: "",
      });
    } catch (err) {
      // console.log("auth service", err);
      return Promise.reject(err);
    }
  }

  /**
   *
   * @param param0 params required from the client, such as authId
   * @returns authorization object
   * @dev
   * #1 This is here for testing purposes
   * #2 This is where the actual validation logic will go
   */
  public async loginWithAuthId(
    ...[{ authId }]: LoginWithAuthIdArgs
  ): Promise<LoginWithAuthIdReturn> {
    try {
      // #1
      if (ENABLE_KEYWORDS) {
        if (ERROR_KEYWORD && authId === ERROR_KEYWORD) {
          throw new Error("AUTH_ID_IS_ERROR");
        }

        if (GUEST_KEYWORD && authId === GUEST_KEYWORD) {
          return Promise.resolve({
            authId: GUEST_KEYWORD,
            username: GUEST_KEYWORD,
          });
        }

        if (WRONG_CREDS_KEYWORD && authId === WRONG_CREDS_KEYWORD) {
          return Promise.resolve({
            authId: "",
            username: "",
          });
        }
      }

      // #2
      return Promise.resolve({
        authId: "",
        username: "",
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Logs out a user defined by an authId
   * @param param0 auth props coming from the client
   * @returns new auth object for the client
   */
  public async logoutWithAuthId(
    ...[{ authId }]: LogoutWithAuthIdArgs
  ): Promise<LogoutWithAuthIdReturn> {
    try {
      if (ENABLE_KEYWORDS) {
        if (ERROR_KEYWORD && authId === ERROR_KEYWORD) {
          throw new Error("AUTH_ID_IS_ERROR");
        }

        if (GUEST_KEYWORD && authId === GUEST_KEYWORD) {
          return Promise.resolve({
            authId: "",
            username: "",
          });
        }

        if (WRONG_CREDS_KEYWORD && authId === WRONG_CREDS_KEYWORD) {
          return Promise.resolve({
            authId: "",
            username: "",
          });
        }
      }

      // #2
      return Promise.resolve({
        authId: "",
        username: "",
      });
    } catch (err) {
      // #3
      return Promise.resolve({
        authId: "",
        username: "",
      });
    }
  }

  /**
   *
   * @param authId authId from auth object (probably comes from a cookie)
   * @returns boolean, true if the authId is valid
   * @dev
   * #1 This is where the actual validation shall take place.
   */
  public async validateWithAuthId(authId: string): Promise<boolean> {
    try {
      if (ENABLE_KEYWORDS) {
        if (ERROR_KEYWORD && authId === ERROR_KEYWORD) {
          throw new Error("AUTH_ID_IS_ERROR");
        }
        if (GUEST_KEYWORD && authId === GUEST_KEYWORD) {
          return Promise.resolve(true);
        }
        if (WRONG_CREDS_KEYWORD && authId === WRONG_CREDS_KEYWORD) {
          return Promise.resolve(false);
        }
      }
      // #1

      return Promise.resolve(false);
    } catch (err) {
      return Promise.resolve(false);
    }
  }
}

export default new AuthService();
