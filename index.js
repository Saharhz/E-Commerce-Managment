import express from "express";
import { startDatabase } from "./config/db.js";
import productRouter from "./routers/product.router.js";
import orderRouter from "./routers/order.router.js";

const app = express();
app.use(express.json());

app.use("/products", productRouter);
app.use("/orders", orderRouter);

console.log("Registered routes: /products and /orders");

app.listen(5001, async () => {
  await startDatabase();
  console.log("Server is running");
});
