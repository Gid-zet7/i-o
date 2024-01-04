import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  const { username, firstname, lastname, email, password, avatarUrl, roles } =
    await request.json();

  if (!username || !firstname || !lastname || !email || !password) {
    return new Response("Please fill all required fields", { status: 400 });
  }

  await connectDB();
  const userExists = await UserModel.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (userExists) {
    return new Response("Username already taken", { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userObj =
    !Array.isArray(roles) || !roles.length || avatarUrl
      ? { username, firstname, lastname, email, password: hashedPassword }
      : {
          username,
          firstname,
          lastname,
          email,
          password: hashedPassword,
          avatarUrl,
          roles,
        };

  const user = await UserModel.create(userObj);

  if (user) {
    return new Response("New user added successfully", { status: 200 });
  }
};
