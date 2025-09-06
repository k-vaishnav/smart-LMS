import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const authProtect = async (req, res, next) => {
  // get token from request header
  // Bearer token
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Unauthorized, no token!" });
  }
  try {
      const tokenArr = req.headers.authorization.split(" "); // ['Bearer], 'token'
      const token = tokenArr[1];

    //   decode the token
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
    // fetch user info from userId stored in token
    req.user = await User.findById(decodedToken.User.id).select('-password');

    next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid token!" });
    }
};
