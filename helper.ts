import { Schema, model, connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

interface ContactUser {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  number: string;
  company: string;
  avatar?: string;
}

interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AdminInterface {
  fullName: string;
  email: string;
  password: string;
}

const contactSchema = new Schema<ContactUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  jobTitle: { type: String, required: true },
  number: { type: String, required: true },
  company: { type: String, required: true },
  avatar: String,
});

const userSchema = new Schema<UserInterface>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const adminSchema = new Schema<AdminInterface>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Contact = model<ContactUser>("Contact", contactSchema);

const User = model<UserInterface>("User", userSchema);

const Admin = model<AdminInterface>("Admin", adminSchema);

export async function saveUserToDatabase(user: ContactUser): Promise<void> {
  try {
    await connect(process.env.MONGO_URL!);

    const newUser = new Contact(user);
    await newUser.save();

    console.log(
      `User ${newUser.firstName} ${newUser.lastName} (${newUser.email}) saved to the database.`
    );
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw new Error("Error saving user to database");
  }
}

export async function createUser(user: UserInterface): Promise<void> {
  try {
    await connect(process.env.MONGO_URL!);

    const newUser = new User(user);
    const createdUser = await newUser.save();

    console.log(
      `User ${createdUser.firstName} ${createdUser.lastName} (${createdUser.email}) saved to the database.`
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
}
