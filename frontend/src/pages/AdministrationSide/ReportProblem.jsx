import React, { useEffect, useState } from "react";
import ReportProblem from "js/models/ReportProblem";
import EmailServices from "js/models/EmailServices"
import Announcement from "js/models/Announcement";
import Swal from 'sweetalert2';

export default function Problems() {
  const [problemsData, setProblemsData] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [problemData,setProblemData] = useState(null);
  const [isClickedRefusedButton,setIsClickedRefusedButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ReportProblem.getAll();
        //console.log(result);
        if (result.success) {
          const data = result.problmes.filter(prevData => prevData.status === "en Attend");
          setProblemsData(data);
        } else {
          alert(result.success + " \n" + result.message);
        }
      } catch (error) {
        alert("catch in button handled : \n" + error);
      }
    };

    fetchData();
  }, []);

  const acceptButtonHandled = async (problem)=>{
    Announcement.Add({"title":"Problem reported resolved","content":"problem about '" + problem.Title + "' has resolved","recipient":problem.studentId})
    ReportProblem.ChangeStatus(problem.Id,"Completed");
    setProblemsData(
      problemsData
        .map(p => p.Id === problem.Id ? { ...p, status: "Completed" } : p)
        .filter(p => p.status === "en Attend")
    );
  }

  const refusedButtonHandled = async (problem)=>{
    setIsClickedRefusedButton(true);
    setProblemData(problem);
  }

  const handleSendReply = async () => {
    //console.log(problemData);
    if(!isClickedRefusedButton){
      Announcement.Add({"title":"repley for problem about '" + problemData.Title + "'","content":replyMessage,"recipient":problemData.studentId})
      Swal.fire({
        title:"replay envoiyer succefuly"
      })
    }else{
      Announcement.Add({"title":"Problem about '" + problemData.Title + "' has refused","content":"cause : " + replyMessage,"recipient":problemData.studentId})
      ReportProblem.ChangeStatus(problemData.Id,"Refused");
      setProblemsData(
        problemsData
          .map(p => p.Id === problemData.Id ? { ...p, status: "Refused" } : p)
          .filter(p => p.status === "en Attend")
      );
      setIsClickedRefusedButton(false);
    }
    setProblemData(null);
    setReplyMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-2 space-y-2">
        {problemsData.length > 0 ? (
          problemsData.map((problem, index) => (
            <div
              key={index}
              className="bg-white hover:bg-gray-100 shadow-lg rounded-lg p-4 border border-gray-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{problem.Title}</h2>
                  <p className="text-sm text-gray-500">{problem.Email}</p>
                </div>

                {/* ✅ Icons */}
                <div className="flex items-center space-x-2">l
                  {problem && (
                    <>
                      <button
                        onClick={() => acceptButtonHandled(problem)}
                        title="Accept"
                        className="text-green-500 hover:text-green-700 text-xl"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => refusedButtonHandled(problem)}
                        title="Refuse"
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        ❌
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-2 overflow-y-auto text-gray-700 text-sm border-t pt-2">
                {problem.Content}
              </div>

              <div className="text-right text-gray-400 text-xs mt-4">{problem.Date}</div>

              <button
                onClick={() => setProblemData(problem)}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Reply
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No problems found</p>
        )}
      </div>

      {/* Reply Modal */}
      {problemData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white shadow-lg p-4 rounded-lg border border-gray-300 w-80">
            <h3 className="text-lg font-semibold text-gray-700">Reply to {problemData.Email}</h3>
            <textarea
              className="w-full p-2 border rounded mt-2"
              rows="3"
              placeholder="Enter your reply..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSendReply}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Send
              </button>
              <button
                onClick={() => {
                  setProblemData(null);
                  setReplyMessage("");
                }}
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}