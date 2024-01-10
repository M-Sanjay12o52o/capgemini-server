import { Schema, model, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const contactSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    jobTitle: { type: String, required: true },
    number: { type: String, required: true },
    company: { type: String, required: true },
    avatar: String,
});
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
const adminSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
const Contact = model("Contact", contactSchema);
const User = model("User", userSchema);
const Admin = model("Admin", adminSchema);
export async function saveUserToDatabase(user) {
    try {
        await connect(process.env.MONGO_URL);
        const newUser = new Contact(user);
        await newUser.save();
        console.log(`User ${newUser.firstName} ${newUser.lastName} (${newUser.email}) saved to the database.`);
    }
    catch (error) {
        console.error("Error saving user to database:", error);
        throw new Error("Error saving user to database");
    }
}
export async function createUser(user) {
    try {
        await connect(process.env.MONGO_URL);
        const newUser = new User(user);
        const createdUser = await newUser.save();
        console.log(`User ${createdUser.firstName} ${createdUser.lastName} (${createdUser.email}) saved to the database.`);
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Error creating user");
    }
}
export async function loginUser(user) {
    try {
        await connect(process.env.MONGO_URL);
        // Find the user in the database by email and password
        const foundUser = await User.findOne({
            email: user.email,
            password: user.password,
        });
        if (foundUser) {
            console.log(`User ${foundUser.firstName} ${foundUser.lastName} (${foundUser.email}) logged in successfully.`);
            return foundUser; // Return the found user
        }
        else {
            console.log("User not found or credentials are incorrect.");
            return null;
        }
    }
    catch (error) {
        console.error("Error logging in user:", error);
        throw new Error("Error logging in user");
    }
}
export async function loginAdmin(admin) {
    try {
        await connect(process.env.MONGO_URL);
        // Find the admin in the database by email and password
        const foundAdmin = await Admin.findOne({
            email: admin.email,
            password: admin.password,
        });
        if (foundAdmin) {
            console.log(`Admin ${foundAdmin.fullName} (${foundAdmin.email}) logged in successfully.`);
            return foundAdmin; // Return the found admin
        }
        else {
            console.log("Admin not found or credentials are incorrect.");
            return null;
        }
    }
    catch (error) {
        console.error("Error logging in admin:", error);
        throw new Error("Error logging in admin");
    }
}
//# sourceMappingURL=helper.js.map