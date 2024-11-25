import { Router } from "express";
import { signin, signup } from "../controllers/userController";
const router = Router();

// POST /signup - Register a new user
// Request: { name, email, password }
// Success: 201 (Created): { message: "User created successfully!", user }
// Errors: 400 (Email already registered), 500 (Internal server error)
router.post("/signup", signup);

// POST /signin - User login
// Request: { email, password }
// Success: 200 (OK): { message: "Login successfully completed", token, user: { id, name, email } }
// Errors: 400 (Invalid credentials), 500 (Internal server error)
router.post("/signin", signin);

export default router;
