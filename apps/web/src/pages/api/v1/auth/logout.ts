import { type NextApiHandler } from "next";
import { authService } from "src/services";
import { ReduxPersistCookie } from "../../../../utils/cookie.utils";
import { type PersistedAuthObject } from "../../../../types/auth.types";
// import { AUTH_SLICE_COOKIE_NAME } from "src/constants";

const handler: NextApiHandler = async (req, res) => {
  console.log("logout endpoint hit", req.cookies);
  switch (req.method) {
    case "POST":
      try {
        // res.status(200).end();
        // if (!req.cookies[AUTH_SLICE_COOKIE_NAME]) {
        //   res.status(200).end();
        //   return;
        // }
        // const authObject = ReduxPersistCookie.parse<PersistedAuthObject>(
        //   req.cookies[AUTH_SLICE_COOKIE_NAME]
        // );
        // if (!authObject) {
        //   res.status(200).end();
        //   return;
        // }

        // const { authId } = authObject;
        // TODO this needs a remake
        const authId = "guest";
        if (!authId) {
          res.status(400).end();
          return;
        }

        const authResponse = await authService.logoutWithAuthId({
          authId,
        });
        console.log({ authResponse });
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
