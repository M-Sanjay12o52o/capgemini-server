import { Schema, model, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    jobTitle: { type: String, required: true },
    number: { type: String, required: true },
    avatar: String,
});
const User = model("User", userSchema);
export async function saveUserToDatabase(firstName, lastName, email, jobTitle, number, avatar) {
    try {
        await connect(process.env.MONGO_URL);
        const user = new User({
            firstName,
            lastName,
            email,
            jobTitle,
            number,
            avatar,
        });
        await user.save();
        console.log(`User ${user.firstName} ${user.lastName} (${user.email}) saved to the database.`);
    }
    catch (error) {
        console.error("Error saving user to database:", error);
        throw new Error("Error saving user to database");
    }
}
//# sourceMappingURL=helper.js.map