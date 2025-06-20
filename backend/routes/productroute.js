import express from 'express';

const router = express.Router();
import { getProducts, createProducts, updateProduct, deleteProduct } from '../controller/product.controller.js';

router.get("/", getProducts);
router.post("/", createProducts);
router.put("/:id", updateProduct );
router.delete("/:id", deleteProduct)


router.get("/test", (req, res) => {
  res.json({ success: true, message: "✅ Router working" });
});

export default router;

// router.delete("/:id", deleteProduct); // Corrected the route to use a single slash