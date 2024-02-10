import { signJwtAccessToken } from "@/lib/jwt";
import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    await connectDB();

    const user = await UserModel.findOne({ username });
    const passMatch = await bcrypt.compare(password, user.password);

    if (!user) return new Response("Invalid username", { status: 400 });
    if (!passMatch) return new Response("Wrong password", { status: 400 });

    if (user && passMatch) {
      const { password, ...userWithoutPass } = user;
      const accessToken = signJwtAccessToken(userWithoutPass);
      const result = {
        ...userWithoutPass,
        accessToken,
      };
      return new Response(JSON.stringify(result));
    } else return new Response(JSON.stringify(null));
  } catch (error) {
    return new Response("Failed to login", { status: 500 });
  }
}
