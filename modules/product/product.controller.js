import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.service.js";

export const createProductHandler = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).send(`Product created successfully`);
  } catch (error) {
    console.error("Create product error:", error.message);
    res.status(500).send("Server Error");
  }
};

export const getAllProductsHandler = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getProductByIdHandler = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).send({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateProductHandler = async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (!updatedProduct)
      return res.status(404).send({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProductHandler = async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    if (!deleted) return res.status(404).send({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
