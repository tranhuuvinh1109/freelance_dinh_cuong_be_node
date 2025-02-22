const PlanPatrol = require("../models/PlanPatrol");
const path = require("path");
const fs = require("fs");
const helper = require("../../utils/help");
const {
  PLAN_EXCEL_FILE,
  EXCEL_PATH,
  PLAN_HEADER,
} = require("../../constant/common");

class DownloadController {
  async downloadPlan(req, res) {
    try {
      const mediaInstances = await PlanPatrol.find()
        .sort("location")
        .select(
          "location date address cable_line name_staff phone_staff result plan description construction_unit_information affect"
        );

      console.log("....", mediaInstances.length);

      const filePath = path.join(__dirname, EXCEL_PATH, PLAN_EXCEL_FILE);

      await helper.clearDataSheet(filePath, "Sheet1", 2);
      await helper.insertDataIntoExcel(filePath, PLAN_HEADER, mediaInstances);

      const fileData = fs.readFileSync(filePath);
      res.setHeader("Content-Type", "application/vnd.ms-excel");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${PLAN_EXCEL_FILE}`
      );
      res.send(fileData);
    } catch (error) {
      console.error("File download failed:", error);
      res.status(404).send("<h1>File not exist</h1>");
    }
  }
}

module.exports = new DownloadController();
