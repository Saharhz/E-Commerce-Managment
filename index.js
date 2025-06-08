import express from "express";
import { startDatabase } from "./config/db.js";
import productRouter from "./routers/product.router.js";
import orderRouter from "./routers/order.router.js";
import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";

const app = express();
app.use(express.json());

app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

console.log("Registered routes: /products and /orders");

app.listen(5001, async () => {
  await startDatabase();
  console.log("Server is running");
});
