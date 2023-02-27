import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    trim: true,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    trim: true,
  },
});

export default orderItemSchema;
