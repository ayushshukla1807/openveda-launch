"use client";

import { useState } from "react";
import { Sparkles, Check, AlertTriangle, Play, HelpCircle, Terminal, RefreshCw, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function AICoachPage() {
  const [activeTab, setActiveTab] = useState<"pr" | "commit" | "scanner" | "quiz">("pr");

  // 1. PR Generator State
  const [diffInput, setDiffInput] = useState("");
  const [prOutput, setPrOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // 2. Commit Linter State
  const [commitInput, setCommitInput] = useState("");
  const [lintResult, setLintResult] = useState<{ valid: boolean; feedback: string } | null>(null);

  // 3. Secret Scanner State
  const [codeInput, setCodeInput] = useState("");
  const [scanResult, setScanResult] = useState<{ safe: boolean; threats: string[] } | null>(null);

  // 4. Git Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      q: "Which command records file snapshots permanently in your history?",
      options: ["git add", "git commit", "git push", "git save"],
      correct: 1
    },
    {
      q: "How do you switch branches and discard uncommitted local edits safely?",
      options: ["git checkout -f <branch>", "git clean -d", "git reset --hard", "git branch -d"],
      correct: 0
    },
    {
      q: "What Git action grabs commit logs from remote without applying them locally?",
      options: ["git pull", "git fetch", "git clone", "git merge"],
      correct: 1
    }
  ];

  // AI PR Generator logic
  const handleGeneratePR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diffInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      let features = "- Implemented new modules\n- Resolved existing issue templates";
      if (diffInput.toLowerCase().includes("button") || diffInput.toLowerCase().includes("css") || diffInput.toLowerCase().includes("style")) {
        features = "- Added responsive CSS stylings\n- Integrated interactive button elements with hover micro-animations";
      } else if (diffInput.toLowerCase().includes("api") || diffInput.toLowerCase().includes("fetch") || diffInput.toLowerCase().includes("route")) {
        features = "- Connected dynamic frontend components to FastAPI router endpoints\n- Added error handling wrapper logs for network failures";
      }

      setPrOutput(`## Describe your changes
${features}

## Type of change
- [x] Bug fix (non-breaking change which fixes an issue)
- [x] New feature (non-breaking change which adds functionality)

## How Has This Been Tested?
- [x] Next.js compilation verify check
- [x] Standard local environment terminal tests`);
      setIsGenerating(false);
    }, 1500);
  };

  // Commit Message Linter logic
  const handleLintCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitInput.trim()) return;

    const conventionalPrefixes = ["feat:", "fix:", "docs:", "style:", "refactor:", "perf:", "test:", "chore:", "ci:"];
    const hasPrefix = conventionalPrefixes.some((p) => commitInput.trim().toLowerCase().startsWith(p));
    
    if (hasPrefix) {
      setLintResult({
        valid: true,
        feedback: "Awesome! Your message follows the Conventional Commit specification perfectly."
      });
    } else {
      setLintResult({
        valid: false,
        feedback: "Linter Warning: Message missing prefix. Standard: 'feat: add login' or 'fix: resolve visual overflow'."
      });
    }
  };

  // Secret Scanner logic
  const handleScanCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInput.trim()) return;

    const threats: string[] = [];
    if (codeInput.toLowerCase().includes("api_key") || codeInput.toLowerCase().includes("apikey") || /AIzaSy[A-Za-z0-9_-]{33}/.test(codeInput)) {
      threats.push("Potential Google/Firebase API Key detected.");
    }
    if (codeInput.toLowerCase().includes("secret") || codeInput.toLowerCase().includes("password")) {
      threats.push("Accidental plaintext credentials/secrets detected.");
    }
    if (codeInput.includes("sk_live_") || codeInput.includes("sk_test_")) {
      threats.push("Stripe private secret key detected.");
    }

    setScanResult({
      safe: threats.length === 0,
      threats
    });
  };

  // Quiz logic
  const handleQuizAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    if (idx === quizQuestions[currentQuestion].correct) {
      setQuizScore(quizScore + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
      }
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans pb-32">
      <div className="mb-12 border-b border-[#2a2d36] pb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">AI Open Source Coach</h1>
        <p className="text-xl text-gray-400">Validate commits, auto-generate descriptions, and scan for secrets in real-time.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2a2d36] mb-8 overflow-x-auto gap-2">
        {[
          { id: "pr", label: "PR Description Gen" },
          { id: "commit", label: "Commit Linter" },
          { id: "scanner", label: "Secret Scanner" },
          { id: "quiz", label: "Git Command Quiz" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 px-4 text-sm font-semibold border-b-2 transition-colors shrink-0 ${
              activeTab === tab.id
                ? "border-orange-500 text-white"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-[#1a1d24] border border-[#2a2d36] rounded-xl p-6">
        {activeTab === "pr" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="text-orange-500" /> AI PR Description Generator
              </h3>
              <p className="text-xs text-gray-400">Paste your raw git diff or briefly summarize your changes to generate a clean pull request description template.</p>
            </div>

            <form onSubmit={handleGeneratePR} className="space-y-4">
              <textarea
                value={diffInput}
                onChange={(e) => setDiffInput(e.target.value)}
                placeholder="Example: Changed the dashboard primary button color to orange and added framer-motion zoom-in animations on hover..."
                rows={5}
                className="w-full bg-[#0f1115] border border-[#2a2d36] rounded-lg p-4 text-xs font-mono text-white focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={isGenerating}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 rounded-lg text-xs font-semibold text-white transition-colors flex items-center gap-2"
              >
                {isGenerating ? <RefreshCw className="animate-spin w-4 h-4" /> : <Send size={14} />}
                Generate Template
              </button>
            </form>

            {prOutput && (
              <div className="space-y-2 mt-6">
                <h4 className="text-xs font-semibold text-gray-500">Generated Markdown Description</h4>
                <div className="bg-[#0f1115] border border-[#2a2d36] rounded-lg p-4 font-mono text-xs text-orange-400 whitespace-pre-wrap select-text">
                  {prOutput}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "commit" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Terminal className="text-orange-500" /> Conventional Commit Linter
              </h3>
              <p className="text-xs text-gray-400">Validate your commit messages against standard developer style conventions before staging updates.</p>
            </div>

            <form onSubmit={handleLintCommit} className="flex gap-3 max-w-2xl">
              <input
                type="text"
                value={commitInput}
                onChange={(e) => setCommitInput(e.target.value)}
                placeholder="feat: add interactive git simulation dashboard..."
                className="w-full bg-[#0f1115] border border-[#2a2d36] rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-xs font-semibold text-white transition-colors"
              >
                Lint
              </button>
            </form>

            {lintResult && (
              <div className={`p-4 rounded-lg border text-xs flex items-center gap-3 ${
                lintResult.valid ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}>
                {lintResult.valid ? <Check size={16} /> : <AlertTriangle size={16} />}
                {lintResult.feedback}
              </div>
            )}
          </div>
        )}

        {activeTab === "scanner" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="text-orange-500" /> Pre-commit Secrets Scanner
              </h3>
              <p className="text-xs text-gray-400">Paste code snippets to verify that no secret keys, API credentials, or certificates are committed publically.</p>
            </div>

            <form onSubmit={handleScanCode} className="space-y-4">
              <textarea
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder={`const stripeKey = "sk_live_51..."\nconst firebaseConfig = { apiKey: "AIzaSy..." }`}
                rows={5}
                className="w-full bg-[#0f1115] border border-[#2a2d36] rounded-lg p-4 text-xs font-mono text-white focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-lg text-xs font-semibold text-white transition-colors"
              >
                Scan Code
              </button>
            </form>

            {scanResult && (
              <div className={`p-5 rounded-lg border text-xs space-y-2 ${
                scanResult.safe ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}>
                <h4 className="font-bold flex items-center gap-2">
                  {scanResult.safe ? <Check size={16} /> : <AlertTriangle size={16} />}
                  {scanResult.safe ? "Workspace Clean" : "Threats Detected!"}
                </h4>
                {scanResult.safe ? (
                  <p className="text-gray-400 text-xs">No public secrets or raw API configuration keys found in the scanned files.</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-300 mt-2">
                    {scanResult.threats.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="text-orange-500" /> Git Command Quiz
              </h3>
              <p className="text-xs text-gray-400">Test your Git terminal knowledge and clear GSoC & Hacktoberfest developer reviews easily.</p>
            </div>

            {!quizFinished ? (
              <div className="space-y-6 max-w-xl">
                <div className="bg-[#0f1115] p-5 rounded-xl border border-[#2a2d36]">
                  <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <h4 className="text-sm font-bold text-white mt-2 leading-relaxed">{quizQuestions[currentQuestion].q}</h4>
                </div>

                <div className="space-y-2">
                  {quizQuestions[currentQuestion].options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === quizQuestions[currentQuestion].correct;
                    
                    let btnStyle = "border-[#2a2d36] hover:bg-[#20242d] text-gray-300";
                    if (selectedAnswer !== null) {
                      if (isCorrect) btnStyle = "border-green-500 bg-green-500/10 text-green-400";
                      else if (isSelected) btnStyle = "border-red-500 bg-red-500/10 text-red-400";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full text-left p-4 rounded-xl border text-xs font-semibold transition-colors flex items-center justify-between ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4 max-w-xl mx-auto">
                <h4 className="text-2xl font-bold text-white">Quiz Finished! 🎉</h4>
                <p className="text-sm text-gray-400">You scored <span className="text-orange-400 font-bold">{quizScore} / {quizQuestions.length}</span> points.</p>
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setQuizScore(0);
                    setQuizFinished(false);
                    setSelectedAnswer(null);
                  }}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-xs font-semibold text-white transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
