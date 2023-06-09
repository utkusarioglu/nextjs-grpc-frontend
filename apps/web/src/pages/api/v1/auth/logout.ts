import { type NextApiHandler } from "next";
import { authService } from "src/services";
import { ReduxPersistCookie } from "../../../../utils/cookie.utils";
import { type PersistedAuthObject } from "../../../../types/auth.types";
import { AUTH_SLICE_COOKIE_NAME } from "src/constants";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        if (!req.cookies[AUTH_SLICE_COOKIE_NAME]) {
          res.status(200).end();
          return;
        }
        const authObject = ReduxPersistCookie.parse<PersistedAuthObject>(
          req.cookies[AUTH_SLICE_COOKIE_NAME]
        );
        if (!authObject) {
          res.status(200).end();
          return;
        }

        const { authId } = authObject;
        if (!authId) {
          res.status(400).end();
          return;
        }

        const authResponse = await authService.logoutWithAuthId({
          authId,
        });
        res.status(200).json(authResponse);
      } catch (e) {
        console.log("userpass post", e);
        res.status(500).end();
      }
      break;

    default:
      res.status(501);
  }
};

export default handler;
