import mongoose from "mongoose";

const orderStatusSchema = new mongoose.Schema({
  received: {
    type: Boolean,
    default: false,
  },
  processing: {
    type: Boolean,
    default: false,
  },
  shipped: {
    type: Boolean,
    default: false,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
});

export default orderStatusSchema;
