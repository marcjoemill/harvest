import express from "express";
// import all controller functions from the controller file

// auth controller
import { signUpUser, signInUser, authenticateUser, authorizeMerchant } from "./controllers/authController.js";

// user controller
import {
  saveUser,
  getUser,
  getAllUsers,
  updateUser,
  removeUser,
  getCurrentUser
} from "./controllers/userController.js" // import controller functions

// product controller
import {
  saveProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  removeProduct,
} from "./controllers/productController.js" // import controller functions

// orderTransaction controller
import {
  saveOrderTransaction,
  getOrderTransaction,
  getOrdersByUser,
  cancelOrder,
  getAllOrders,
  updateOrderTransaction
} from "./controllers/orderTransactionController.js" // import controller functions

import {
  saveOrUpdateCart,
  getCart,
  clearCart
} from "./controllers/cartController.js";

// create a new router instance to handle routes
const router = express.Router();  // creates a new instance of router to define the api routes

// define the root route
router.get('/', (req, res) => {
  // send welcome message for the root path
  res.send('Welcome to the API!');  // welcome screen for the '/' path
});

// auth routes
router.post('/auth/signup', signUpUser);   // sign-up route
router.post('/auth/signin', signInUser);   // sign-in route

// user routes (with protecion using tokens [authenticateUser])
router.post('/users', authenticateUser, saveUser); // create new user
router.get('/users', authenticateUser, getAllUsers); // get all users
router.get('/users/:email', authenticateUser, getUser); // get user by email
router.put('/users/:email', authenticateUser, updateUser); // update user by email
router.delete('/users/:email', authenticateUser, removeUser); // delete user by email
router.get('/users/me', authenticateUser, getCurrentUser);

// product routes
router.post('/products', authenticateUser, saveProduct); // create new product
// router.post('/products', saveProduct); 
router.get('/products', getAllProducts); // get all product 
router.get('/products/:productID', getProduct); // get product by id
router.put('/products/:productID', authenticateUser, updateProduct); // update product by id
router.delete('/products/:productID', authenticateUser, removeProduct); // delete product by id

// order routes
router.post('/orders', authenticateUser, saveOrderTransaction); // create new order
router.get('/orders/all', authenticateUser, authorizeMerchant, getAllOrders);// get all orders (admin)
router.get('/orders/:transactionID', authenticateUser, getOrderTransaction); // get order by transaction id
router.put('/orders/:transactionID/update', authenticateUser, updateOrderTransaction); // update order status (admin)
router.get('/orders', authenticateUser, getOrdersByUser); // get all orders of a user
router.put('/orders/:transactionID/cancel', authenticateUser, cancelOrder); // cancel order

// cart routes
router.get('/cart', authenticateUser, getCart); // get the user's cart
router.post('/cart', authenticateUser, saveOrUpdateCart); // save or update cart
router.delete('/cart', authenticateUser, clearCart); // clear cart

// export the router to be used in the main server file
export default router;