import React from "react";

const problemsData = [
    {
        title: "issue with the library system",
        email: "nazmbenalia@example.com",
       content: "There is an issue with the library system. I can't borrow books.",
        date: "2024-11-18",
    },
    {
       title: "issue with the The parking area ",
        email: "mohAitwnach@example.com",
       content: "The parking area is always full and causes problems,The parking area is always full and causes problems,The parking area is always full and causes problems,.",
        date: "2024-11-17",
    },
    {
      title: "issue with the...",
        email: "moTarikat@example.com",
       content: "I cannot access the university portal with my credentials.",
        date: "2024-11-16",
    },
];

export default function Problems() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="flex justify-center m-4">
                <h1 className="text-blue-800 p-4 text-3xl font-bold">Studentscontents</h1>
            </div>

           
            <div className="container mx-auto p-4 space-y-6">
                {problemsData.map((problem, index) => (
                    <div
                        key={index}
                        className="bg-white hover:bg-gray-100 shadow-lg rounded-lg p-6 border border-gray-300"
                    >
                      
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {problem.title}
                                </h2>
                                <p className="text-sm text-gray-500">{problem.email}</p>
                            </div>
                        </div>

                        <div className="mt-4 max-h-40 overflow-y-auto text-gray-700 text-sm border-t pt-2">
                            {problem.report}
                        </div>

                      
                        <div className="text-right text-gray-400 text-xs mt-4">
                            {problem.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
