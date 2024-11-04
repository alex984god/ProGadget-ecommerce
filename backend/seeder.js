import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Import users
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // Import products
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);

        // Update existing orders to add isPaid field
        const orders = await Order.find({});
        for (let order of orders) {
            order.isPaid = false; // Set default value or any specific logic
            await order.save();
        }

        console.log("Data Imported and orders updated!".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}