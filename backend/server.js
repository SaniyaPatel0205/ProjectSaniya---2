// Import required modules
const express = require("express");
const server = express();
const { request, response } = require("http"); 
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product"); // Import the Product model
const port = 3000; // Set the port for the server
const db_uri = "mongodb+srv://patelsaniya2178:patelsaniya201@cluster0.q3fpjz5.mongodb.net/products?retryWrites=true&w=majority"; // MongoDB connection URI

// Middleware setup
server.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
server.use(express.json()); 
server.use(cors()); 

// Connect to MongoDB
mongoose.connect(db_uri)
    .then((result) => {
        // Start the server once connected to the database
        server.listen(port, () => console.log(`Listening on ${port}...\nConnected to the database`));
    })
    .catch((error) => {
        console.log(error);
    });

// Default route
server.get("/", (request, response) => {
    response.send("LIVE!!!");
});

// Get all products route
server.get("/products", async (request, response) => {
    const products = await Product.find();
    response.send(products);
});

// Add a new product route
server.post("/addProduct", async (request, response) => {
    const product = request.body;
    const postProduct = new Product({
        // Create a new Product instance
        id: product.id,
        productName: product.productName,
        brand: product.brand,
        quantity: product.quantity,
        image: product.image,
        price: product.price,
    });
    const saveProduct = await postProduct.save(); // Save the new product to the database
    saveProduct ? response.send("Product is added to inventory") : response.send("Failed to add");
});

// Delete a product route
server.delete("/product/:id", async (request, response) => {
    const { id } = request.params;
    const deleteProduct = await Product.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
    });
    deleteProduct
        ? response.send(`${id} product has been deleted`)
        : response.send("Failed to delete!");
});

// Edit a product route
server.patch("/product/:id", async (request, response) => {
    const { id } = request.params;
    const product = request.body;
    const patchProduct = await Product.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: product }
    );
    patchProduct
        ? response.send(`${product.productName} has been edited`)
        : response.send("Failed to edit");
});
