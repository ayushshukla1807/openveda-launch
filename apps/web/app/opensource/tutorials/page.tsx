"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, GitBranch, ArrowRight, Play, RefreshCw, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommitNode {
  id: string;
  message: string;
  branch: string;
  parent?: string;
  isStaged?: boolean;
}

export default function TutorialsPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to the Interactive Git Sandbox!",
    "Learn the PR workflow interactively. Type your git commands below.",
    "Hint: Start by typing 'git init' to initialize your workspace."
  ]);
  const [commits, setCommits] = useState<CommitNode[]>([]);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [currentBranch, setCurrentBranch] = useState("main");
  const [branches, setBranches] = useState<string[]>(["main"]);
  const [gameStep, setGameStep] = useState(0); // 0: init, 1: add, 2: commit, 3: branch, 4: checkout, 5: commit-on-branch, 6: push

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const parts = cmd.split(" ");
    const primary = parts[0];
    const secondary = parts[1];

    let output = "";
    let success = false;

    if (primary === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (cmd === "git init") {
      if (gameStep === 0) {
        output = "Initialized empty Git repository in /workspace/.git/";
        setGameStep(1);
        success = true;
      } else {
        output = "Git repository is already initialized!";
      }
    } else if (cmd === "git add ." || cmd === "git add") {
      if (gameStep === 1) {
        setStagedFiles(["index.js", "style.css"]);
        output = "Staged 2 files: index.js, style.css";
        setGameStep(2);
        success = true;
      } else if (gameStep < 1) {
        output = "Fatal: Not a git repository (or write 'git init' first)";
      } else {
        output = "All files already up-to-date and staged.";
      }
    } else if (cmd.startsWith("git commit")) {
      const match = cmd.match(/git commit -m "(.+)"/);
      if (gameStep === 2) {
        if (match && match[1]) {
          const msg = match[1];
          const newCommit: CommitNode = {
            id: Math.random().toString(36).substring(2, 7),
            message: msg,
            branch: currentBranch,
            parent: commits[commits.length - 1]?.id
          };
          setCommits([...commits, newCommit]);
          setStagedFiles([]);
          output = `[${currentBranch} (root-commit) ${newCommit.id}] ${msg}\n 2 files changed, 45 insertions(+)`;
          setGameStep(3);
          success = true;
        } else {
          output = 'Error: Please commit with a message, e.g., git commit -m "Initial commit"';
        }
      } else if (gameStep === 5) {
        if (match && match[1]) {
          const msg = match[1];
          const newCommit: CommitNode = {
            id: Math.random().toString(36).substring(2, 7),
            message: msg,
            branch: currentBranch,
            parent: commits[commits.length - 1]?.id
          };
          setCommits([...commits, newCommit]);
          output = `[${currentBranch} ${newCommit.id}] ${msg}\n 1 file changed, 10 insertions(+)`;
          setGameStep(6);
          success = true;
        } else {
          output = 'Error: Please commit with a message, e.g., git commit -m "Fix bugs"';
        }
      } else {
        output = "Nothing to commit, working tree clean or initialize/add first.";
      }
    } else if (cmd.startsWith("git branch")) {
      const branchName = parts[2];
      if (gameStep === 3) {
        if (branchName) {
          setBranches([...branches, branchName]);
          output = `Created branch '${branchName}'`;
          setGameStep(4);
          success = true;
        } else {
          output = "Error: Specify a branch name, e.g., git branch feature-login";
        }
      } else {
        output = "You should make an initial commit on 'main' first!";
      }
    } else if (cmd.startsWith("git checkout")) {
      const branchName = parts[2];
      if (gameStep === 4) {
        if (branches.includes(branchName)) {
          setCurrentBranch(branchName);
          output = `Switched to branch '${branchName}'`;
          setGameStep(5);
          success = true;
        } else {
          output = `error: pathspec '${branchName}' did not match any file(s) known to git`;
        }
      } else {
        output = "Invalid sequence. Follow the guide commands.";
      }
    } else if (cmd === "git push" || cmd === "git push origin" || cmd.startsWith("git push")) {
      if (gameStep === 6) {
        output = `To github.com/ayushshukla1807/openveda-launch.git\n * [new branch]      ${currentBranch} -> ${currentBranch}\nBranch '${currentBranch}' set up to track remote branch from 'origin'.`;
        setGameStep(7); // Completed!
        success = true;
      } else {
        output = "Push failed. Make sure you staged, committed, and are on the correct branch.";
      }
    } else {
      output = `bash: command not found: ${primary}. Supported: git init, git add ., git commit, git branch, git checkout, git push, clear`;
    }

    setHistory((prev) => [...prev, `$ ${cmd}`, output]);
    setInput("");
  };

  const stepsGuides = [
    { text: "1. Run 'git init' to set up git repository", expected: "git init" },
    { text: "2. Stage your edits by running 'git add .'", expected: "git add ." },
    { text: '3. Create your first commit: git commit -m "Initial commit"', expected: 'git commit -m "Initial commit"' },
    { text: "4. Create a new branch: git branch feature-ui", expected: "git branch feature-ui" },
    { text: "5. Checkout your branch: git checkout feature-ui", expected: "git checkout feature-ui" },
    { text: '6. Stage & commit on branch: git commit -m "Add UI components"', expected: 'git commit -m "Add UI components"' },
    { text: "7. Push changes to remote: git push origin feature-ui", expected: "git push origin feature-ui" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans pb-32">
      <div className="mb-12 border-b border-[#2a2d36] pb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">Git Sandbox & Tutorials</h1>
        <p className="text-xl text-gray-400">Master the command line interactively with visual commit graphing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Game Progress & Guides */}
        <div className="space-y-6">
          <div className="bg-[#1a1d24] border border-[#2a2d36] rounded-xl p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <GitBranch className="text-orange-500" /> Tutorial Roadmap
            </h3>
            
            <div className="space-y-4">
              {stepsGuides.map((step, idx) => {
                const isActive = gameStep === idx;
                const isPassed = gameStep > idx;

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                      isActive
                        ? "bg-orange-500/10 border-orange-500/50"
                        : isPassed
                        ? "bg-green-500/5 border-green-500/20 opacity-75"
                        : "bg-transparent border-[#2a2d36] opacity-40"
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle className="text-green-500 w-5 h-5 shrink-0 mt-0.5" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold ${
                        isActive ? "bg-orange-500 text-white" : "bg-[#2a2d36] text-gray-400"
                      }`}>
                        {idx + 1}
                      </div>
                    )}
                    <div>
                      <p className={`text-sm font-medium ${isActive ? "text-white" : "text-gray-300"}`}>{step.text}</p>
                      {isActive && (
                        <p className="text-xs text-orange-400/80 mt-1">Copy and paste this into the terminal</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {gameStep >= 7 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl text-center"
            >
              <h3 className="text-xl font-bold text-white mb-2">Tutorial Cleared! 🎉</h3>
              <p className="text-green-200/80 text-sm mb-4">You have successfully mastered git staging, committing, branching, and pushing!</p>
              <button
                onClick={() => {
                  setGameStep(0);
                  setCommits([]);
                  setBranches(["main"]);
                  setCurrentBranch("main");
                  setHistory(["Workspace reset. Type 'git init' to start over."]);
                }}
                className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg text-sm hover:bg-green-600"
              >
                Restart Game
              </button>
            </motion.div>
          )}
        </div>

        {/* Right Side: Terminal & Commit Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Terminal Component */}
          <div className="bg-[#0b0c10] border border-[#2a2d36] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[380px]">
            {/* Header */}
            <div className="bg-[#15171e] px-4 py-3 border-b border-[#2a2d36] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal className="text-orange-500 w-4 h-4" />
                <span className="text-xs text-gray-300 font-mono">git-sandbox@openveda:~ ({currentBranch})</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 text-[#abb2bf] select-text">
              {history.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleCommand} className="border-t border-[#2a2d36] bg-[#0c0d12] flex items-center px-4 py-2">
              <span className="text-green-500 font-mono text-xs mr-2">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent text-white font-mono text-xs w-full focus:outline-none placeholder:text-gray-600"
                placeholder="Type command here..."
                autoFocus
              />
            </form>
          </div>

          {/* Commit Tree Visualizer */}
          <div className="bg-[#1a1d24] border border-[#2a2d36] rounded-xl p-6 min-h-[180px] flex flex-col justify-center">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Commit Tree Graph</h4>
            
            {commits.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-sm">
                No commits made yet. Make your first commit on standard git branches to generate nodes.
              </div>
            ) : (
              <div className="flex flex-col gap-6 relative pl-4 border-l border-orange-500/30 ml-4">
                <AnimatePresence>
                  {commits.map((commit, index) => (
                    <motion.div
                      key={commit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 relative"
                    >
                      {/* Commit Node Circle */}
                      <div className="absolute -left-[25px] w-[18px] h-[18px] rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center border-4 border-[#1a1d24] shadow-[0_0_12px_rgba(249,115,22,0.4)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      
                      <div className="bg-[#0f1115] border border-[#2a2d36] p-3 rounded-lg flex items-center justify-between w-full">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-orange-400 text-xs font-bold">{commit.id}</span>
                            <span className="text-xs text-gray-500 font-mono bg-gray-500/10 px-1.5 py-0.5 rounded">
                              {commit.branch}
                            </span>
                          </div>
                          <p className="text-white text-sm font-semibold">{commit.message}</p>
                        </div>
                        <span className="text-xs text-gray-600 font-mono">index: {index}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
