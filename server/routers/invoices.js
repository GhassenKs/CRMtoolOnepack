const express = require("express");
const router = express.Router();
const InvoiceController = require("../controllers/invoices");
const upload = require("../middleware/upload");

router.get("/getInvoices", InvoiceController.getInvoices);
router.get("/getInvoice/:id", InvoiceController.getInvoice);
router.post("/addInvoice", upload.single("image"), InvoiceController.addInvoice);
router.put(
  "/updateInvoice/:id",
  upload.single("image"),
  InvoiceController.updateInvoice
);
router.delete("/removeInvoice/:id", InvoiceController.removeInvoice);

module.exports = router;
