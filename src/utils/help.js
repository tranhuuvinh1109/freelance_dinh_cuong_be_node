const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");
const { Document, Packer, Paragraph, TextRun, AlignmentType } = require("docx");
const XLSX = require("xlsx");

const BASE_DIR = path.join(__dirname, "../..");
const MEDIA_DIR = path.join(BASE_DIR, "manage/media");

const getDataSheet = (file, sheet) => {
  try {
    if (!fs.existsSync(file)) {
      throw new Error("File not found");
    }

    const workbook = XLSX.readFile(file);
    const worksheet = workbook.Sheets[sheet];

    if (!worksheet) {
      return { message: `Sheet '${sheet}' not found in the workbook` };
    }

    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 5 });

    return { message: "Get data sheet success", file, sheet, data };
  } catch (error) {
    return { message: `An error occurred: ${error.message}` };
  }
};
async function insertDataIntoExcel(filePath, columns, jsonData) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    if (jsonData.length === 0) {
      console.log("No data to write");
      return;
    }

    worksheet.columns = columns;

    jsonData.map((value) => {
      worksheet.addRow(value);
    });

    await workbook.xlsx.writeFile(filePath);
    console.log(`Excel file created successfully at ${filePath}`);
  } catch (error) {
    console.error("Error creating Excel file:", error);
  }
}

const insert = (file, sheet, cell, value) => {
  try {
    if (!fs.existsSync(file)) {
      throw new Error("File not found");
    }

    const workbook = XLSX.readFile(file);
    const worksheet = workbook.Sheets[sheet];

    if (!worksheet) {
      return { message: `Sheet '${sheet}' not found in the workbook` };
    }

    worksheet[cell] = { v: value };
    XLSX.writeFile(workbook, file);

    return {
      message: "Insert success",
      sheet,
      updatedLocation: cell,
      updatedValue: value,
    };
  } catch (error) {
    return { message: `An error occurred: ${error.message}` };
  }
};

const createNewSheet = (file, newSheetName) => {
  try {
    if (!fs.existsSync(file)) {
      throw new Error("File not found");
    }

    const workbook = XLSX.readFile(file);
    const worksheet = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, worksheet, newSheetName);

    XLSX.writeFile(workbook, file);

    return { message: "Create new sheet success", file, newSheetName };
  } catch (error) {
    return { message: `An error occurred: ${error.message}` };
  }
};

const clearData = (file, sheet, startRow = 2) => {
  try {
    if (!fs.existsSync(file)) {
      throw new Error("File not found");
    }

    const workbook = XLSX.readFile(file);
    const worksheet = workbook.Sheets[sheet];

    if (!worksheet) {
      return { message: `Sheet '${sheet}' not found in the workbook` };
    }

    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let R = startRow - 1; R <= range.e.r; R++) {
      for (let C = 0; C <= range.e.c; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (worksheet[cellAddress]) worksheet[cellAddress].v = undefined;
      }
    }

    XLSX.writeFile(workbook, file);

    return { message: `Cleared data from row ${startRow} onward`, sheet };
  } catch (error) {
    return { message: `An error occurred: ${error.message}` };
  }
};

function addParagraphWithStyle(doc, text, size, isBold, alignment) {
  const paragraph = new Paragraph({
    children: [
      new TextRun({
        text,
        font: "Arial",
        size: size * 2,
        bold: isBold,
      }),
    ],
    alignment,
  });

  doc.addSection({
    properties: {},
    children: [paragraph],
  });
}

async function createReportDocx(filename, saveDir, report) {
  const filePath = path.join(saveDir, filename);
  const doc = new Document();
  const [day, month, year] = report.end_day.split("/");

  addParagraphWithStyle(
    doc,
    `Báo cáo ADG Trạm ${report.location} ngày ${report.start_day} đến ngày ${report.end_day}`,
    16,
    true,
    AlignmentType.CENTER
  );

  addParagraphWithStyle(
    doc,
    "Kính gửi: Lãnh đạo Đài VT QNN!",
    16,
    false,
    AlignmentType.LEFT
  );
  addParagraphWithStyle(
    doc,
    `Trạm ${report.location} báo cáo tình hình thông tin liên lạc từ 07h00’ ngày ${report.start_day} đến 07h00’ ngày ${report.end_day}.`,
    12,
    false,
    AlignmentType.LEFT
  );
  addParagraphWithStyle(
    doc,
    "I. Tình hình thông tin:",
    16,
    true,
    AlignmentType.LEFT
  );
  addParagraphWithStyle(
    doc,
    `1. Thiết bị viễn thông: ${report.device}`,
    12,
    false,
    AlignmentType.LEFT
  );
  addParagraphWithStyle(doc, report.sv_device, 12, false, AlignmentType.LEFT);
  addParagraphWithStyle(
    doc,
    `2. Cáp quang: ${report.cable}`,
    12,
    false,
    AlignmentType.LEFT
  );
  addParagraphWithStyle(doc, report.sv_cable, 12, false, AlignmentType.LEFT);
  addParagraphWithStyle(
    doc,
    `3. Nguồn điện, điều hoà: ${report.power}`,
    12,
    false,
    AlignmentType.LEFT
  );
  addParagraphWithStyle(doc, report.sv_power, 12, false, AlignmentType.LEFT);
  addParagraphWithStyle(
    doc,
    "II. Tình hình công việc:",
    16,
    true,
    AlignmentType.LEFT
  );
  addParagraphWithStyle(
    doc,
    "1. Thực hiện theo công văn:",
    12,
    false,
    AlignmentType.LEFT
  );
  addParagraphWithStyle(doc, report.report, 12, false, AlignmentType.LEFT);
  addParagraphWithStyle(
    doc,
    "2. Công việc khác:",
    12,
    false,
    AlignmentType.LEFT
  );
  addParagraphWithStyle(doc, report.other_job, 12, false, AlignmentType.LEFT);
  addParagraphWithStyle(doc, "III. Tồn tại:", 16, true, AlignmentType.LEFT);
  addParagraphWithStyle(doc, report.exist, 12, false, AlignmentType.LEFT);
  addParagraphWithStyle(doc, "ĐỀ XUẤT KIẾN NGHỊ", 16, true, AlignmentType.LEFT);
  addParagraphWithStyle(doc, report.propose, 12, false, AlignmentType.LEFT);
  addParagraphWithStyle(
    doc,
    `Quy Nhơn, Ngày ${day} tháng ${month} năm ${year}`,
    12,
    false,
    AlignmentType.RIGHT
  );
  addParagraphWithStyle(doc, "Người báo cáo", 12, false, AlignmentType.RIGHT);
  addParagraphWithStyle(doc, report.creator, 14, true, AlignmentType.RIGHT);

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
}

function clearWordDocument(filePath) {
  try {
    const doc = new Document();

    const buffer = Packer.toBuffer(doc);
    fs.writeFileSync(filePath, buffer);

    return { message: "Document cleared successfully" };
  } catch (error) {
    return { message: `An error occurred: ${error.message}` };
  }
}

function clearDataSheet(file, sheet, startRow = 2) {
  try {
    if (!fs.existsSync(file)) {
      return { message: "File not found" };
    }

    const workbook = XLSX.readFile(file);

    if (!workbook.SheetNames.includes(sheet)) {
      return { message: `Sheet '${sheet}' not found in the workbook` };
    }

    const worksheet = workbook.Sheets[sheet];
    const range = XLSX.utils.decode_range(worksheet["!ref"]);

    for (let row = startRow - 1; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        if (worksheet[cellAddress]) {
          delete worksheet[cellAddress].v;
          delete worksheet[cellAddress].w;
        }
      }
    }

    XLSX.writeFile(workbook, file);

    return {
      message: `Cleared data from row ${startRow} onward`,
      sheet_name: sheet,
    };
  } catch (error) {
    return { message: `An error occurred: ${error.message}` };
  }
}

module.exports = {
  createReportDocx,
  clearWordDocument,
  getDataSheet,
  insert,
  createNewSheet,
  clearData,
  insertDataIntoExcel,
  clearDataSheet,
};
