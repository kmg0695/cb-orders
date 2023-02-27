import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Client from "../models/Client.js";
import { config } from "dotenv";

config();

export const getClientById = async (req, res) => {
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid client ID" });
    }

    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    const client = await Client.findOne({
      _id: req.params.id,
      userId: decoded.userId,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getClients = async (req, res) => {
  try {
    const decoded = req.user;
    const clients = await Client.find({ userId: decoded.userId });
    return res.json(clients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const createClient = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address: { street, city, state, postalCode },
    } = req.body;

    const client = new Client({
      name,
      email,
      password,
      phone,
      address: {
        street,
        city,
        state,
        postalCode,
      },
      orders: [],
      orderStatus: [],
    });

    const token = jwt.sign({ client }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const createdClient = await client.save();
    res.status(201).json({ createdClient, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid client ID" });
    }

    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const updatedClient = {
      name: req.body.name || client.name,
      email: req.body.email || client.email,
      password: req.body.password || client.password,
      phone: req.body.phone || client.phone,
      address: {
        street: req.body.address?.street || client.address.street,
        city: req.body.address?.city || client.address.city,
        state: req.body.address?.state || client.address.state,
        postalCode: req.body.address?.postalCode || client.address.postalCode,
      },
      orderStatus: req.body.orderStatus || client.orderStatus,
    };

    const result = await Client.findByIdAndUpdate(
      req.params.id,
      updatedClient,
      { new: true }
    );
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Authorization denied" });
    }

    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    const userId = decoded.client._id;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid client ID" });
    }

    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (client._id.toString() !== userId) {
      return res.status(401).json({ message: "Authorization denied" });
    }

    await client.remove();
    res.json({ message: "Client removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const isMatch = await client.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = client.getSignedJwtToken();

    res.json({ client, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
