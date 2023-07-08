import {
  AuthService,
  ERROR_KEYWORD,
  GUEST_KEYWORD,
  WRONG_CREDS_KEYWORD,
} from "./auth.service";

let authService: AuthService;

beforeEach(() => {
  authService = new AuthService();
});

describe("AuthService", () => {
  describe("loginWithUserPass", () => {
    /**
     * Tests wether the error keyword used for testing the service for
     * error responses throw an error.
     */
    it("Throws with error keyword", async () => {
      return expect(
        authService.loginWithUserPass({
          username: ERROR_KEYWORD,
          password: ERROR_KEYWORD,
        })
      ).rejects.toThrowError("USER_PASS_IS_ERROR");
    });

    it("Allows guest input", async () => {
      const response = await authService.loginWithUserPass({
        username: GUEST_KEYWORD,
        password: GUEST_KEYWORD,
      });
      const expected = {
        authId: GUEST_KEYWORD,
        username: GUEST_KEYWORD,
      };
      expect(response).toEqual(expected);
    });

    it("Sends expected response on wrong credentials", async () => {
      const response = await authService.loginWithUserPass({
        username: WRONG_CREDS_KEYWORD,
        password: WRONG_CREDS_KEYWORD,
      });
      const expected = {
        authId: "",
        username: "",
      };
      expect(response).toEqual(expected);
    });
  });

  describe("loginWithAuthId", () => {
    it("Throws with error keyword", async () => {
      return expect(
        authService.loginWithAuthId({
          authId: ERROR_KEYWORD,
        })
      ).rejects.toThrowError("AUTH_ID_IS_ERROR");
    });

    it("Allows guest input", async () => {
      const response = await authService.loginWithAuthId({
        authId: GUEST_KEYWORD,
      });
      const expected = {
        authId: GUEST_KEYWORD,
        username: GUEST_KEYWORD,
      };
      expect(response).toEqual(expected);
    });

    it("Sends expected response on wrong credentials", async () => {
      const response = await authService.loginWithAuthId({
        authId: WRONG_CREDS_KEYWORD,
      });
      const expected = {
        authId: "",
        username: "",
      };
      expect(response).toEqual(expected);
    });
  });

  describe("logoutWithAuthId", () => {
    it("Still responds with error keyword", async () => {
      const response = await authService.logoutWithAuthId({
        authId: ERROR_KEYWORD,
      });
      const expected = {
        authId: "",
        username: "",
      };
      expect(response).toEqual(expected);
    });

    it("Allows guest input", async () => {
      const response = await authService.logoutWithAuthId({
        authId: GUEST_KEYWORD,
      });
      const expected = {
        authId: "",
        username: "",
      };
      expect(response).toEqual(expected);
    });

    it("Sends expected response on wrong credentials", async () => {
      const response = await authService.logoutWithAuthId({
        authId: WRONG_CREDS_KEYWORD,
      });
      const expected = {
        authId: "",
        username: "",
      };
      expect(response).toEqual(expected);
    });
  });

  describe("validateWithAuthId", () => {
    it("Still responds with error keyword", async () => {
      const response = await authService.validateWithAuthId(ERROR_KEYWORD);
      expect(response).toEqual(false);
    });

    it("Allows guest input", async () => {
      const response = await authService.validateWithAuthId(GUEST_KEYWORD);
      expect(response).toEqual(true);
    });

    it("Sends expected response on wrong credentials", async () => {
      const response = await authService.validateWithAuthId(
        WRONG_CREDS_KEYWORD
      );
      expect(response).toEqual(false);
    });
  });
});
