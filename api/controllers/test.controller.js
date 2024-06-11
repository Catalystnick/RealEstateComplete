import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res) => {
  console.log(req.userId);

  //If all checks on middleware pass, user is authenticated
  res.status(200).json({ message: "You are authenticated!" });
};

export const isAdmin = async (req, res) => {
  //Gettin token from cookies
  const token = req.cookies.token;

  //Checking to see if token exists
  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  //Verifying if token is valid/not expired
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid token!" });
    if (!payload?.isAdmin) {
      return res.status(403).json({ message: "Not Authorized" });
    }
  });

  //If all checks pass user is admin authorised

  res.status(200).json({ message: "You are admin authorised!" });
};
