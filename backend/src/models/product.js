import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: ["tshirt", "trackpant"],
      required: true
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    size: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true
    },

    stock: {
      type: Number,
      required: true
    },

    description: {
      type: String
    },

    images: {
      type: [String],
      default: []
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
