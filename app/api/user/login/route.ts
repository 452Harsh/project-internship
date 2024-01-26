import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connection from "@/database/config";
import jwt from "jsonwebtoken";

connection();

export const POST = async (NextRequest: any) => {
  try {
    const body = await NextRequest.json();
    const { username, password }: any = body;
    if (!username || !password) {
      return new Response("username and password is required", {
        status: 401,
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return new Response("Username doesn't exists", { status: 400 });
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return new Response("Incorect Password", { status: 400 });
    }
    const secretKey = process.env.JWT_SECRETKEY || "default_secret_key";

    const tokenData = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(tokenData, secretKey, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({ message: "Login successfull" });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong ", { status: 500 });
  }
};
