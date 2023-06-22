import { type NextApiHandler } from "next";
import { authService } from "src/services";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const { username, password } = req.body;
      try {
        const authObject = await authService.loginWithUserPass({
          username,
          password,
        });
        res.status(200).json(authObject);
        // res.redirect("/")
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
