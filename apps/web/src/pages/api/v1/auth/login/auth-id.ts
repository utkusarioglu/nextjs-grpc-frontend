import { type NextApiHandler } from "next";
import { authService } from "src/services";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const { authId } = req.body;
      try {
        const authResponse = await authService.loginWithAuthId({
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
