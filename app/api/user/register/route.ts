import User from "@/models/user";
import { NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import connection from "@/database/config";

connection();

export const POST = async (NextRequest: any) => {
  try {
    const body = await NextRequest.json();
    const { name, username, password }: any = body;
    if (!name || !username || !password) {
      return new Response("name,username and password is required", {
        status: 401,
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return new Response("Username already exists", { status: 400 });
    }
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return new Response("user saved successfully", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
