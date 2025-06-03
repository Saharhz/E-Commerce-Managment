import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "./order.service.js";

export const createOrderHandler = async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).send(order);
  } catch (error) {
    console.error("Create order error:", error.message);
    res.status(500).send("Server Error");
  }
};

export const getAllOrdersHandler = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getOrderByIdHandler = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id); // ✅ define order
    if (!order) {
      return res.status(404).json({ message: "Order not found" }); // ✅ clear message
    }
    res.json(order);
  } catch (error) {
    console.error("Get order error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateOrderHandler = async (req, res) => {
  try {
    const updatedOrder = await updateOrder(req.params.id, req.body);
    if (!updatedOrder)
      return res.status(404).send({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOrderHandler = async (req, res) => {
  try {
    const deleted = await deleteOrder(req.params.id);
    if (!deleted) return res.status(404).send({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
