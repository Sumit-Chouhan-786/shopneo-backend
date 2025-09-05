const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    businessName: { type: String, trim: true },

    bannerImage: {
      url: { type: String, trim: true },
      public_id: { type: String, trim: true },
    },
    profileImage: {
      url: { type: String, trim: true },
      public_id: { type: String, trim: true },
    },
    galleryImages: [
      {
        url: { type: String, trim: true },
        public_id: { type: String, trim: true },
      },
    ],

    location: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true, unique: true },
    contact: { type: Number, trim: true },
    numberAlternative: { type: Number, trim: true },
    whatsapp: { type: String, trim: true },
    instagram: { type: String, trim: true },
    facebook: { type: String, trim: true },
    youtube: { type: String, trim: true },
    description: { type: String, trim: true },

    metaTitle: { type: String, default: "" },
    metaKeywords: { type: [String], default: [] },
    metaDescription: { type: String, default: "" },

    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },

    // ✅ store only IDs of products & blogs
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],

    businessHours: {
      monday: { open: { type: String, default: "" }, close: { type: String, default: "" } },
      tuesday: { open: { type: String, default: "" }, close: { type: String, default: "" } },
      wednesday: { open: { type: String, default: "" }, close: { type: String, default: "" } },
      thursday: { open: { type: String, default: "" }, close: { type: String, default: "" } },
      friday: { open: { type: String, default: "" }, close: { type: String, default: "" } },
      saturday: { open: { type: String, default: "" }, close: { type: String, default: "" } },
      sunday: { open: { type: String, default: "" }, close: { type: String, default: "" } },
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
