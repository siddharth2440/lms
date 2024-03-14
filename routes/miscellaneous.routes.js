import { Router } from "express";
import { contactHere } from "../controllers/miscellaneous.controller.js";
const router = Router()

router.route('/').post(contactHere);

export default router