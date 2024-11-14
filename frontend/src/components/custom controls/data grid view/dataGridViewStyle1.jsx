import React from 'react';

export default function DataGridView({ Columns, Data }) {
  return (
    <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-md">
      {/* رأس الجدول لعرض عناوين الأعمدة */}
      <thead>
        <tr className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
          {Columns.map((col) => (
            <th
              key={col.title}
              style={{ width: col.width }} // تخصيص العرض لكل عمود
              className="p-3 border-b font-semibold text-left"
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>

      {/* الجسم الرئيسي للجدول لعرض البيانات */}
      <tbody>
        {Data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`text-gray-700 hover:bg-gray-100 ${
              rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            }`} // تمييز الصفوف
          >
            {Columns.map((col, colIndex) => (
              <td key={colIndex} className="p-3 border-b text-sm">
                {row[col.title]} {/* عرض القيمة داخل كل خلية */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
