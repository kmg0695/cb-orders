import * as dotenv from "dotenv";
import connectDB from "./config/db.js";
import * as seed from "./data/products.js";
import Product from "./models/Product.js";
import Client from "./models/Client.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Client.deleteMany({});
    await User.deleteMany({});

    // Hash passwords before inserting users and clients
    const hashedUsers = seed.users.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      return { ...user, password: hashedPassword };
    });

    const hashedClients = seed.clients.map((client) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(client.password, salt);
      return { ...client, password: hashedPassword };
    });

    await Product.insertMany(seed.products);
    await Client.insertMany(hashedClients);
    await User.insertMany(hashedUsers);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
