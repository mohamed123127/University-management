import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DashBoard from "js/models/DashboardStats";
import LabelStyle1 from "components/custom controls/labels/LabelStyle1";

const REPORT_COLORS = {
  Completed: "#00ff00",
  "In Progress": "	#fa8000",
  Pending: " #2563EB",
  Rejected: " #FF0000",
};

export default function StatisticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await DashBoard.GetDashboardStats();
      if (res?.success) {
        setData(res);
      } else {
        alert("Failed to fetch statistics");
      }
    };
    fetchStats();
  }, []);

  if (!data) return <div className="p-4">Loading statistics...</div>;

  const virtualRequestsPieData = [
    { name: "Completed", value: data.virtualRequests.Completed },
    { name: "Rejected", value: data.virtualRequests.Rejected },
    { name: "Pending", value: data.virtualRequests["en attend"] },
  ];

  const documentRequestsPieData = [
    { name: "Completed", value: data.documents.Completed },
    { name: "In Progress", value: data.documents["In Progress"] },
    { name: "Pending", value: data.documents.Pending },
    { name: "Rejected", value: data.documents.Rejected},
  ];

  const reportProblemsPieData = [
    { name: "Completed", value: data.reports.Completed },
    { name: "Pending", value: data.reports["en Attend"] },
    { name: "Rejected", value: data.reports["Refused"] },
  ];

  const barData = [
    { name: "Students", value: data.students },
    { name: "Reports", value: data.reports.total },
    { name: "Documents", value: data.documents.total },
    { name: "virtual", value: data.virtualRequests.total },
  ];

  return (
    <div className="min-h-screen p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50">
      {/* General Statistics on Top Left */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between min-h-[350px] h-full">
        <LabelStyle1
          labelText="General Statistics Comparison"
          labelClassName="text-xl font-semibold mb-4 text-center"
        />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: E-Requests */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between min-h-[350px] h-full">
        <LabelStyle1
          labelText="Virtual-Requests Status"
          labelClassName="text-xl font-semibold mb-4 text-center"
        />
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={virtualRequestsPieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {virtualRequestsPieData.map((entry, index) => (
                <Cell key={`vr-cell-${index}`} fill={Object.values(REPORT_COLORS)[index % 4]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Document Requests */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between min-h-[350px] h-full">
        <LabelStyle1
          labelText="Document-Requests Status"
          labelClassName="text-xl font-semibold mb-4 text-center"
        />
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={documentRequestsPieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {documentRequestsPieData.map((entry, index) => (
                <Cell key={`doc-cell-${index}`} fill={Object.values(REPORT_COLORS)[index % 4]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Report Problems */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between min-h-[350px] h-full">
        <LabelStyle1
          labelText="Report-Problems Status"
          labelClassName="text-xl font-semibold mb-4 text-center"
        />
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={reportProblemsPieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {reportProblemsPieData.map((entry) => (
                <Cell
                  key={`report-cell-${entry.name}`}
                  fill={REPORT_COLORS[entry.name]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}