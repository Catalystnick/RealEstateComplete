import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //Gettin token from cookies
  const token = req.cookies.token;

  //Checking to see if token exists
  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  //Verifying if token is valid/not expired
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid token!" });

    req.userId = payload.id;

    //express middleware intercepts all requests, checks to see if valid and then runs the next process
    next();
  });
};
