import React, { useEffect, useState } from "react";
import ReportProblem from "js/models/ReportProblem";

export default function Problems() {
  const [problemsData, setProblemsData] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ReportProblem.getAll();
        if (result.success) {
          const withStatus = result.problmes.map((p) => ({ ...p, status: null }));
          setProblemsData(withStatus);
        } else {
          alert(result.success + " \n" + result.message);
        }
      } catch (error) {
        alert("catch in button handled : \n" + error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (index, status) => {
    const updated = [...problemsData];
    updated[index].status = status;
    setProblemsData(updated);
  };

  const handleSendReply = async () => {
    try {
      const response = await fetch("http://localhost/YOUR_BACKEND_PATH/sendEmail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: selectedEmail,        
          message: replyMessage,       
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Reply sent successfully!");
      } else {
        alert("Failed to send reply: " + result.message);
      }
    } catch (error) {
      alert("Error sending reply: " + error.message);
    } finally {
      setSelectedEmail(null);
      setReplyMessage("");
    }
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
                <div className="flex items-center space-x-2">
                  {problem.status === null && (
                    <>
                      <button
                        onClick={() => handleStatusChange(index, "accepted")}
                        title="Accept"
                        className="text-green-500 hover:text-green-700 text-xl"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => handleStatusChange(index, "refused")}
                        title="Refuse"
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        ❌
                      </button>
                    </>
                  )}

                  {problem.status === "accepted" && (
                    <span className="text-green-600 text-xl">✅</span>
                  )}
                  {problem.status === "refused" && (
                    <span className="text-red-600 text-xl">❌</span>
                  )}
                </div>
              </div>

              <div className="mt-2 overflow-y-auto text-gray-700 text-sm border-t pt-2">
                {problem.Content}
              </div>

              <div className="text-right text-gray-400 text-xs mt-4">{problem.Date}</div>

              <button
                onClick={() => setSelectedEmail(problem.Email)}
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
      {selectedEmail && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white shadow-lg p-4 rounded-lg border border-gray-300 w-80">
            <h3 className="text-lg font-semibold text-gray-700">Reply to {selectedEmail}</h3>
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
                  setSelectedEmail(null);
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