import { useState } from "react";
import RequirementUpload from "./components/RequirementUpload";
import CodeGenerator from "./components/CodeGenerator";
import BugFixer from "./components/BugFixer";
import TestCaseGenerator from "./components/TestCaseGenerator";
import CodeSummarizer from "./components/CodeSummarizer";
import ChatBot from "./components/ChatBot";

const tabs = [
  "Requirement Upload",
  "Code Generator",
  "Bug Fixer",
  "Test Case Generator",
  "Code Summarizer",
  "Chatbot",
];

export default function App() {
  const [tab, setTab] = useState(0);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">SmartSDLC</h1>
      <div className="flex space-x-2 mb-4">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={\`px-3 py-1 border \${tab === i ? "bg-gray-200" : ""}\`}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 0 && <RequirementUpload />}
      {tab === 1 && <CodeGenerator />}
      {tab === 2 && <BugFixer />}
      {tab === 3 && <TestCaseGenerator />}
      {tab === 4 && <CodeSummarizer />}
      {tab === 5 && <ChatBot />}
    </div>
  );
}
