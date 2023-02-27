import mongoose from "mongoose";
import orderStatusSchema from "./OrderStatus.js";
import orderItemSchema from "./OrderItem.js";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    unique: true,
    required: true,
    default: generateOrderID,
    trim: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
    trim: true,
  },
  orderTotal: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    trim: true,
  },
  orderStatus: [orderStatusSchema],
  orderItems: [orderItemSchema],
});

function generateOrderID() {
  return uuidv4().replace(/-/g, "").slice(0, 8);
}

orderSchema.pre("save", async function (next) {
  try {
    let order = this;
    while (true) {
      const existingOrder = await mongoose
        .model("Order")
        .findOne({ orderID: order.orderID });
      if (!existingOrder) {
        break;
      }
      order.orderID = generateOrderID();
    }
    next();
  } catch (err) {
    next(err);
  }
});

export default orderSchema;
