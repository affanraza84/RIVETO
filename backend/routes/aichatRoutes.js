import express from "express";
import { response } from "../controller/aiChatController.js";
import isAuth from "../middleware/isAuth.js";

const aiRoutes = express.Router();

aiRoutes.post('/chat', isAuth, response); 

export default aiRoutes;
