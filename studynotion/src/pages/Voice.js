import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  async function generateAnswer() {
    console.log("Generating...");
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAppjpWIU_nL1nJG9bDfXxguAekE8Hh2mA",
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
        cancelToken: source.token,
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
      setQuestion("");
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled");
        setAnswer("Answer generation stopped.");
      } else {
        console.error("Error generating answer:", error);
        setAnswer("Something went wrong!");
      }
    }
  }

  function stopAnswer() {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("User stopped the request");
      setCancelTokenSource(null);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold text-center">StudyNotion ChatBox</h1>

       
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-400 bg-gray-900 text-black text-lg"
          placeholder="Ask me anything..."
        />

        <div className="flex justify-center space-x-4">
          <button
            onClick={generateAnswer}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition-all shadow-lg"
          >
            Generate Answer
          </button>
          <button
            onClick={stopAnswer}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all shadow-lg"
          >
            Stop
          </button>
        </div>

        <textarea
          readOnly
          value={answer || "Your answer will appear here..."}
          rows={6}
          className="w-full p-4 rounded-xl border-2 border-gray-600 bg-gray-900 text-black resize-none"
        />
      </div>
    </div>
  );
}

export default App;
