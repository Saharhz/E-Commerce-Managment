import express from "express";
import {
  createOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  updateOrderHandler,
  deleteOrderHandler,
  getOrdersByUserHandler,
} from "../modules/order/order.controller.js";
import { verifyToken } from "../Middleware/Auth.js";

const router = express.Router();
router.get("/user", verifyToken, getOrdersByUserHandler);
router.put("/:id", updateOrderHandler);
router.delete("/:id", deleteOrderHandler);
router.post("/", verifyToken, createOrderHandler);
router.get("/", verifyToken, getAllOrdersHandler);
router.get("/:id", verifyToken, getOrderByIdHandler);

export default router;
