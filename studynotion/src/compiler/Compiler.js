import React, { useState, useEffect } from "react";
import axios from "axios";

// Using react-icons for the sun and moon icons
import { FaMoon, FaSun } from 'react-icons/fa';

function Compiler() {
  const [languageId, setLanguageId] = useState(63);
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Studynotion");
    }
  }`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [darkMode, setDarkMode] = useState(true); // Default is dark mode

  const languages = [
    { id: 63, name: "JavaScript", defaultCode: `console.log("Hello, World!");` },
    { id: 62, name: "Java", defaultCode: `public class Main {
      public static void main(String[] args) {
          System.out.println("Welcome to Studynotion");
      }
    }` },
    { id: 54, name: "C++", defaultCode: `#include <iostream>
    using namespace std;
    int main() {
        cout << "Welcome to Studynotion" << endl;
        return 0;
    }` },
    { id: 71, name: "Python", defaultCode: `print("Welcome to Studynotion")` },
  ];

  useEffect(() => {
    const selectedLanguage = languages.find(lang => lang.id === languageId);
    setCode(selectedLanguage ? selectedLanguage.defaultCode : "");
  }, [languageId]);

  const runCode = async () => {
    setOutput("Running...");

    const encodedCode = btoa(code);
    const encodedInput = btoa(input);

    try {
      const { data } = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
        {
          source_code: encodedCode,
          language_id: languageId,
          stdin: encodedInput,
        },
        {
          headers: {
            "x-rapidapi-key": "6164491045mshbc12455a5c2474ep17f4fejsn4df0836e82ac",
            "x-rapidapi-host": "judge029.p.rapidapi.com",
            "Content-Type": "application/json",
          },
        }
      );

      const result = atob(data.stdout || "") || "Error / No output";
      setOutput(result);
    } catch (err) {
      console.error(err);
      setOutput("Error while running the code.");
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={darkMode ? styles.appDark : styles.appLight}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🖥️ Online Code Compiler</h1>

        <select
          style={styles.select}
          onChange={(e) => setLanguageId(Number(e.target.value))}
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>

        <div style={styles.codeSection}>
          <textarea
            style={styles.textarea}
            rows="15"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />

          <textarea
            style={styles.textarea}
            rows="5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input (optional)..."
          />
        </div>

        <button style={styles.button} onClick={runCode}>
          ▶️ Run Code
        </button>

        <div style={styles.outputContainer}>
          <h3 style={styles.outputLabel}>Output:</h3>
          <pre style={styles.output}>{output}</pre>
        </div>

        {/* Theme Toggle Icon */}
        <button style={styles.themeToggleButton} onClick={toggleTheme}>
          {darkMode ? <FaSun size={24} color="#FFD700" /> : <FaMoon size={24} color="#4B0082" />}
        </button>
      </div>
    </div>
  );
}

const styles = {
  appLight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8", // Light background color
    fontFamily: "Arial, sans-serif",
    color: "#333", // Dark text color
  },
  appDark: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1f1f1f", // Dark background color
    fontFamily: "Arial, sans-serif",
    color: "#fff", // White text color for contrast
  },
  container: {
    backgroundColor: "#2a2a2a", // Dark background for container
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "80%",
    maxWidth: "900px",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  select: {
    padding: "12px",
    fontSize: "16px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#333", // Dark background for select dropdown
    color: "#fff",
    cursor: "pointer",
  },
  codeSection: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #444", // Dark border color for textareas
    backgroundColor: "#2a2a2a", // Dark background for textareas
    color: "#fff", // White text color for code
    resize: "vertical",
    minHeight: "100px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 30px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    marginBottom: "20px",
    transition: "background-color 0.3s",
  },
  outputContainer: {
    backgroundColor: "#212121", // Dark background for output area
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  outputLabel: {
    fontSize: "18px",
  },
  output: {
    backgroundColor: "#333", // Darker background for output
    padding: "15px",
    borderRadius: "8px",
    textAlign: "left",
    fontFamily: "Courier New, monospace",
    whiteSpace: "pre-wrap",
    overflowX: "auto",
    fontSize: "14px",
    color: "#fff", // White text color for output
  },
  themeToggleButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    position: "absolute",
    top: "20px",
    right: "20px",
  },
};

export default Compiler;
