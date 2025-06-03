import express from "express";
import {
  createOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  updateOrderHandler,
  deleteOrderHandler,
} from "../modules/order/order.controller.js";

const router = express.Router();

router.post("/", createOrderHandler);
router.get("/", getAllOrdersHandler);
router.get("/:id", getOrderByIdHandler);
router.put("/:id", updateOrderHandler);
router.delete("/:id", deleteOrderHandler);

export default router;
