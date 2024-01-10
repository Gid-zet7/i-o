import { signJwtAccessToken } from "@/lib/jwt";
import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  await connectDB();

  const user = await UserModel.findOne({ username });
  const passMatch = await bcrypt.compare(password, user.password);

  if (user && passMatch) {
    const { password, ...userWithHashedPass } = user;
    const accessToken = signJwtAccessToken(userWithHashedPass);
    const result = {
      ...userWithHashedPass,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}
