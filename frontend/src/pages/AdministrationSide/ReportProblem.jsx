import React, { useEffect ,useState} from "react";
import ReportProblem from "js/models/ReportProblem";
export default function Problems() {
    
    const [problemsData, setProblemsData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await ReportProblem.getAll();
            console.log(result.success);
          if (result.success) {
            console.log(result.problmes);
            setProblemsData(result.problmes); // Update state
          } else {
            alert(result.success + " \n" + result.message);
          }
        } catch (error) {
          alert("catch in button handled : \n" + error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-2 space-y-2">
                {problemsData && problemsData.map((problem, index) => (
                    <div
                        key={index}
                        className="bg-white hover:bg-gray-100 shadow-lg rounded-lg p-4 border border-gray-300"
                    >
                      
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {problem.Title}
                                </h2>
                                <p className="text-sm text-gray-500">{problem.Email}</p>
                            </div>
                        </div>

                        <div className="mt-2 overflow-y-auto text-gray-700 text-sm border-t pt-2">
                            {problem.Content}
                        </div>

                      
                        <div className="text-right text-gray-400 text-xs mt-4">
                            {problem.Date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
