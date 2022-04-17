import { getRepository } from "typeorm";
import { UserMaster } from "../database/entity/UserMaster";

export function authTokenValidator(req, res, next) {
  var no_validate_path = ["/user-manager/register", "/user-manager/register"];

  if (no_validate_path.indexOf(req.path) >= 0) {
    next();
  } else {
    var auth = req.headers.token;

    getRepository(UserMaster)
      .findOne({ where: { token: auth } })
      .then((data) => {
        if (null == data) {
          res.status(401).json({ error: "Unauthorized" });
        } else {
          next();
        }
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  }
}
