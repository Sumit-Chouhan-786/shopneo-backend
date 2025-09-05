const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true, 
    },
    heading: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: {
      url: { type: String, trim: true },
      public_id: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
