import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  // Destructure user details from request
  const { username, firstname, lastname, email, password, avatarUrl, roles } =
    await request.json();

  // Return an error is any these details is missing
  if (!username || !firstname || !lastname || !email || !password) {
    return new Response("Please fill all required fields", { status: 400 });
  }

  // Connecting to the database
  await connectDB();

  // Check if username already exists
  const userExists = await UserModel.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // If username exists return an error
  if (userExists) {
    return new Response("Username already taken", { status: 409 });
  }

  // If username doesn't exist we go on to hash the password
  // We don't want to store user passwords in our database
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create user object with data provided
  const userObj =
    !Array.isArray(roles) || !roles.length || !avatarUrl
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

  // Create and save user to the database
  const user = await UserModel.create(userObj);

  if (user) {
    return new Response("New user added successfully", { status: 200 });
  }
};
