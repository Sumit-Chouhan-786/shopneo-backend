const express = require("express");
const businesshoursRoutes = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { deleteBusinessHours, updateBusinessHours, getAllBusinessHours, createBusinessHours } = require("../controllers/businesshours.controllers.js");

// ======================= ROUTES =======================

businesshoursRoutes.post(
  "/add/:customerId",        
  authMiddleware,
  upload.single("image"),
  createBusinessHours
);

businesshoursRoutes.get(
  "/allTime/:customerId",      
  authMiddleware,
  getAllBusinessHours
);

businesshoursRoutes.put(
  "/update/:id",
  authMiddleware,
  upload.single("image"),
  updateBusinessHours
);


// Delete Blog
businesshoursRoutes.delete(
  "/delete/:id",
  authMiddleware,
  deleteBusinessHours
);

module.exports = businesshoursRoutes;
