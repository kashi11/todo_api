import express from "express";
import loginRouter from "./Login";
import registerRouter from "./User";
import todoRouter from "./Todo";
import healthRouter from "./Health";
const router = express.Router();

router.use("/", healthRouter);
router.use("/login", loginRouter);
router.use("/user", registerRouter);
router.use("/todo", todoRouter);

export default router;
