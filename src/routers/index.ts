import express from "express";
import UserManagerApi from "../controllers/UserManagerApi";

const router = express.Router();

router.post("/user-manager/login", async (_req, res, next) => {
  const userManagerApi: UserManagerApi = new UserManagerApi();
  const response = await userManagerApi.login(_req.body);

  if (null == response) {
    next("Unauthorized");
  }
  return res.send(response);
});

router.post("/user-manager/register", async (_req, res) => {
  const userManagerApi: UserManagerApi = new UserManagerApi();
  const response = await userManagerApi.register(_req.body);
  return res.send(response);
});

export default router;
