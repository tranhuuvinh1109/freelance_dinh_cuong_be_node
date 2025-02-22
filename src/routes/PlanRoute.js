const express = require("express");
const PlanPatrolController = require("../app/controllers/PlanPatrolController");
const DownloadController = require("../app/controllers/DownloadController");
const router = express.Router();

router.post("/create", PlanPatrolController.create);
router.get("/", PlanPatrolController.getAll);
router.get("/plan-file", DownloadController.downloadPlan);

module.exports = router;
