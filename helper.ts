import { Schema, model, connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  number: string;
  company: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  jobTitle: { type: String, required: true },
  number: { type: String, required: true },
  company: { type: String, required: true },
  avatar: String,
});

const User = model<IUser>("User", userSchema);

export async function saveUserToDatabase(
  firstName: string,
  lastName: string,
  email: string,
  jobTitle: string,
  number: string,
  company: string,
  avatar?: string
): Promise<void> {
  try {
    await connect(process.env.MONGO_URL!);

    const user = new User({
      firstName,
      lastName,
      email,
      jobTitle,
      number,
      company,
      avatar,
    });
    await user.save();

    console.log(
      `User ${user.firstName} ${user.lastName} (${user.email}) saved to the database.`
    );
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw new Error("Error saving user to database");
  }
}
