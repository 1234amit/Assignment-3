import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export const createUser = async (userData: IUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({ ...userData, password: hashedPassword });
  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // const token = jwt.sign({ userId: user._id, role: user.role }, "secret", {
  //   expiresIn: "30d",
  // });
  // Use process.env.JWT_SECRET
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );

  return { user, token };
};
