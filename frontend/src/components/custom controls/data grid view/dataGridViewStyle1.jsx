import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DataGridView({ Columns, Data, ClassName }) {
  const { t, i18n } = useTranslation();

  return (
    <table className={`${ClassName} min-w-full border border-gray-300 bg-white shadow-lg rounded-md`}>
      <thead>
        <tr className="bg-gray-100 text-gray-800 text-sm leading-normal">
          {Columns.map((col) => (
            <th key={col.name} style={{ width: col.width }} className={`p-3 border-b font-semibold ${col.name === 'Notes' ? 'text-start' : 'text-center'}`}>
              { t(col.Header)}
            </th>))}
        </tr>
      </thead>
      <tbody>
        {Data.map((row, rowIndex) => (
          <tr key={rowIndex} className={`text-gray-700 hover:bg-gray-100 ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            {Columns.map((col, colIndex) => (
            <td key={colIndex} className={`p-3 border-b text-center text-sm ${col.name === 'Notes' ? 'text-start' : 'text-center'}`}>
              {row[col.name]}
            </td>))}
          </tr>))}
        </tbody>
    </table>
  );
}
