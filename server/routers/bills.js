const express = require("express");
const router = express.Router();
const BillController = require("../controllers/bills");
const upload = require("../middleware/upload");

router.get("/getBills", BillController.getBills);
router.get("/getBill/:id", BillController.getBill);
router.post("/addBill", upload.single("image"), BillController.addBill);
router.put("/updateBill/:id", upload.single("image"), BillController.updateBill);
router.delete("/removeBill/:id", BillController.removeBill);

module.exports = router;
