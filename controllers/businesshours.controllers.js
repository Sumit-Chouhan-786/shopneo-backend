const Customer = require("../models/Customer.js");
const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");

// ======================= CREATE BUSINESS HOURS =======================
const createBusinessHours = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    // Find customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Ensure businessHours array exists
    if (!customer.businessHours) customer.businessHours = [];

    // Create new business hours object
    const newBusinessHours = { monday, tuesday, wednesday, thursday, friday, saturday, sunday };

    // Push to array
    customer.businessHours.push(newBusinessHours);
    await customer.save();

    // Return the newly added business hours
    const addedBusinessHours = customer.businessHours[customer.businessHours.length - 1];

    res.status(201).json({
      message: "✅ Business hours created successfully",
      businessHours: addedBusinessHours,
    });
  } catch (error) {
    console.error("Create Business Hours Error:", error);
    res.status(500).json({ message: "Error creating business hours", error: error.message });
  }
};

// ======================= GET ALL BUSINESS HOURS BY CUSTOMER =======================
const getAllBusinessHours = async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ businessHours: customer.businessHours });
  } catch (error) {
    console.error("Get Business Hours Error:", error);
    res.status(500).json({ message: "Error fetching business hours", error: error.message });
  }
};

// ======================= UPDATE BUSINESS HOURS =======================
const updateBusinessHours = async (req, res) => {
  try {
    const { customerId, id } = req.params; // id = businessHours id
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    // Find the business hours object
    const bh = customer.businessHours.id(id);
    if (!bh) return res.status(404).json({ message: "Business hours not found" });

    // Update fields
    bh.monday = monday ?? bh.monday;
    bh.tuesday = tuesday ?? bh.tuesday;
    bh.wednesday = wednesday ?? bh.wednesday;
    bh.thursday = thursday ?? bh.thursday;
    bh.friday = friday ?? bh.friday;
    bh.saturday = saturday ?? bh.saturday;
    bh.sunday = sunday ?? bh.sunday;

    await customer.save();

    res.status(200).json({ message: "✅ Business hours updated successfully", businessHours: bh });
  } catch (error) {
    console.error("Update Business Hours Error:", error);
    res.status(500).json({ message: "Error updating business hours", error: error.message });
  }
};

// ======================= DELETE BUSINESS HOURS =======================
const deleteBusinessHours = async (req, res) => {
  try {
    const { customerId, id } = req.params; // id = businessHours id

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    // Remove the business hours object
    const bh = customer.businessHours.id(id);
    if (!bh) return res.status(404).json({ message: "Business hours not found" });

    bh.remove();
    await customer.save();

    res.status(200).json({ message: "✅ Business hours deleted successfully" });
  } catch (error) {
    console.error("Delete Business Hours Error:", error);
    res.status(500).json({ message: "Error deleting business hours", error: error.message });
  }
};

module.exports = {
  createBusinessHours,
  getAllBusinessHours,
  updateBusinessHours,
  deleteBusinessHours,
};
