const EXCEL_PATH = "../../assets/excel";
const PLAN_EXCEL_FILE = "plan.xlsx";

const PLAN_HEADER = [
  {
    header: "ID",
    key: "_id",
    width: 25,
  },
  {
    header: "Trạm",
    key: "location",
    width: 25,
  },
  {
    header: "Ngày",
    key: "date",
    width: 25,
  },
  {
    header: "Địa chỉ",
    key: "address",
    width: 25,
  },
  {
    header: "Tuyến Cab",
    key: "cable_line",
    width: 25,
  },
  {
    header: "Tên Nhân viên",
    key: "name_staff",
    width: 25,
  },
  {
    header: "SĐT",
    key: "phone_staff",
    width: 25,
  },
  {
    header: "Kết quả",
    key: "result",
    width: 25,
  },
  {
    header: "Kế hoạch",
    key: "plan",
    width: 25,
  },
  {
    header: "Kế hoạch",
    key: "plan",
    width: 25,
  },
  {
    header: "Thông tin đơn vị xây dựng",
    key: "construction_unit_information",
    width: 25,
  },
  {
    header: "Ảnh hưởng",
    key: "affect",
    width: 25,
  },
  {
    header: "Mô tả",
    key: "description",
    width: 25,
  },
];

module.exports = { EXCEL_PATH, PLAN_EXCEL_FILE, PLAN_HEADER };
