const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL

   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);

   response.json(filteredProducts); // Send the filtered products as a JSON response
});

// Handle GET request for path /product/id/:id
router.get('/product/id/:id', (request, response) => {
   const { id } = request.params; // Access the id parameter from the URL
   const productId = parseInt(id); // Convert the id to a number for comparison

   // Find product by id
   const product = products.find(product => product.id === productId);

   if (product) {
      response.json(product); // Send the product as a JSON response
   } else {
      response.status(404).json({ error: 'Product not found' }); // Handle case where product is not found
   }
});



router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});


module.exports = router;