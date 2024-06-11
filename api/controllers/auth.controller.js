import bcrypt from "bcryptjs";
import prisma from "../lib/prismaClient.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //db operations
  const { username, email, password } = req.body;
  try {
    //HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    //CREATE NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User Created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  //db operations
  const { username, password } = req.body;
  console.log(req.description);

  try {
    //CHECK IF USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    //CHECK IF PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    //GENERATE COOKIE TOKEN AND SEND TO USER

    //Set max age to one week
    const age = 1000 * 60 * 60 * 24 * 7;

    //Generate a json web token
    const token = jwt.sign(
      { id: user.id, isAdmin: true },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );
    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, { httpOnly: true, maxAge: age })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to log in" });
  }
};

export const logout = (req, res) => {
  //db operations

  res.clearCookie("token").status(200).json({ message: "Log out success" });
};
