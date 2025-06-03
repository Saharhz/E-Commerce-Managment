import Product from "../../models/Product.js";
import Order from "../../models/Order.js";

export const createOrder = async (orderData) => {
  let totalPrice = 0;
  for (const item of orderData.products) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new Error(`Product with ID ${item.product} not found`);
    }
    totalPrice += product.price * item.quantity;
  }

  const order = new Order({
    products: orderData.products,
    totalPrice,
    status: orderData.status || "pending",
  });
  return await order.save();
};

export const getAllOrders = async () => {
  return await Order.find().populate("products.product");
};

export const getOrderById = async (id) => {
  return await Order.findById(id).populate("products.product");
};

export const updateOrder = async (id, data) => {
  return await Order.findByIdAndUpdate(id, data, { new: true });
};

export const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};
