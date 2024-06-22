import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { create, update, remove, getAll } from "./facility.controller";

const router = Router();

router.post("/", authenticate, authorize("admin"), create);
router.put("/:id", authenticate, authorize("admin"), update);
router.delete("/:id", authenticate, authorize("admin"), remove);
// router.get("/", authenticate, authorize("admin"), getAll);
router.get("/", getAll);

export default router;
