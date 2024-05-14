import { customError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //getting the token created
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    next(customError(401, "Unauthorized."));
    return;
  }

  //verifying the token
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(customError(403, "Forbidden."));
    next();
  });
};
