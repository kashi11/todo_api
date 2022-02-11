import express from "express";
import HealthController from "../Controllers/HealthController";
const router = express.Router();

const healthController = new HealthController();

router.get("/", healthController.healthCheck);

export default router;
