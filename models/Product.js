const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true, 
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: {
      url: { type: String, trim: true },
      public_id: { type: String, trim: true },
    },
    whatsappUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
