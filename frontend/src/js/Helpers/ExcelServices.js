import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

class ExcelService{

    static exportToExcel(data, fileName){
    // 1. تحويل البيانات إلى ورقة Excel
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 2. إنشاء مصنف Excel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 3. إنشاء ملف Excel بصيغة Blob
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // 4. حفظ الملف باستخدام file-saver
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
    }
}

export default ExcelService;
