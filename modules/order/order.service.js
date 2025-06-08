import Product from "../../models/Product.js";
import Order from "../../models/Order.js";

// export const createOrder = async (orderData, userId) => {
//   let totalPrice = 0;
//   for (const item of orderData.products) {
//     const product = await Product.findById(item.product);
//     if (!product) {
//       throw new Error(`Product with ID ${item.product} not found`);
//     }
//     totalPrice += product.price * item.quantity;
//   }

export const createOrder = async (orderData, userId) => {
  let totalPrice = 0;
  const validatedProducts = [];

  for (const item of orderData.products) {
    const foundProduct = await Product.findById(item.product);
    if (!foundProduct) {
      throw new Error(`Product with ID ${item.product} not found`);
    }

    totalPrice += foundProduct.price * item.quantity;
    validatedProducts.push({
      user: userId,
      product: foundProduct._id,
      quantity: item.quantity,
    });
  }

  const order = new Order({
    user: userId,
    products: validatedProducts,
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

export const getOrdersByUser = async (userId) => {
  return await Order.find({ user: userId }).populate("products.product");
};
