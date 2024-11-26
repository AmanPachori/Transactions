"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// POST /signup - Register a new user
// Request: { name, email, password }
// Success: 201 (Created): { message: "User created successfully!", user }
// Errors: 400 (Email already registered), 500 (Internal server error)
router.post("/signup", userController_1.signup);
// POST /signin - User login
// Request: { email, password }
// Success: 200 (OK): { message: "Login successfully completed", token, user: { id, name, email } }
// Errors: 400 (Invalid credentials), 500 (Internal server error)
router.post("/signin", userController_1.signin);
exports.default = router;
