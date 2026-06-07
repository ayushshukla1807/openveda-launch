"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Hi! I'm your AI Open Source Coach. Ask me any question about Git, GitHub, PRs, or open-source programs like GSoC and Hacktoberfest!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const faqs: FAQItem[] = [
    {
      question: "I've never contributed to open source. Where do I start?",
      answer: (
        <div className="space-y-4 text-gray-300 text-sm">
          <p>Perfect! You're in the right place. Here's your step-by-step path:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Learn the Basics:</strong> Read our Getting Started Guide, understand what GitHub is, and check out some tutorials.</li>
            <li><strong>Set Up Your Environment:</strong> Create a GitHub account, install Git, and set up your favorite code editor (like VS Code).</li>
            <li><strong>Make Your First Contribution:</strong> Start with easy documentation updates, typos, or beginner-friendly issues.</li>
            <li><strong>Get Help:</strong> Ask questions in the repository's issue comments, join active developer communities, and read the FAQ.</li>
          </ol>
          <p className="text-orange-400 font-semibold">Recommended first issue: Fix a typo or add documentation!</p>
        </div>
      )
    },
    {
      question: "Do I need to know how to code to contribute?",
      answer: (
        <p className="text-gray-300 text-sm leading-relaxed">
          Absolutely not! Open source is about much more than just code. You can contribute by writing or translating documentation, designing logos/UI elements, organizing issues, answering community questions, or writing blog posts. Documentation changes are actually some of the most appreciated contributions!
        </p>
      )
    },
    {
      question: "What do I get for participating in open source?",
      answer: (
        <p className="text-gray-300 text-sm leading-relaxed">
          Besides the satisfaction of contributing to software used by millions, you gain real-world collaborative experience, receive code reviews from experienced engineers, build a public portfolio of contributions that recruiters look at, and make connections within a global community of developers.
        </p>
      )
    },
    {
      question: "What counts as a valid pull request?",
      answer: (
        <p className="text-gray-300 text-sm leading-relaxed">
          A valid PR is any contribution that adds value to a project, whether it's fixing a bug, improving docs, refactoring code, or adding features. To be merged, your PR should follow the project's coding standards, pass all automated checks/tests, and be approved by a maintainer. Spamy or low-effort PRs (like adding random spaces or trivial formatting changes just to increase commit counts) are marked as invalid.
        </p>
      )
    }
  ];

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);
    setChatInput("");
    setIsTyping(true);

    // AI Response simulation with smart heuristics
    setTimeout(() => {
      let reply = "I'm not completely sure about that. Let me look it up or you can ask another git-related question!";
      const query = userMessage.toLowerCase();

      if (query.includes("git commit") || query.includes("commit")) {
        reply = "To commit files in Git, use the command: `git commit -m 'Your commit message'`. Make sure to stage files first with `git add .`!";
      } else if (query.includes("pr") || query.includes("pull request")) {
        reply = "A Pull Request (PR) is a way to propose changes to a repository. You fork the repo, create a branch, push your changes, and then click 'New Pull Request' on GitHub to ask the maintainers to review and merge your code.";
      } else if (query.includes("fork")) {
        reply = "Forking creates a personal copy of another user's repository on your GitHub account. This lets you make changes freely without affecting the original project until you submit a Pull Request.";
      } else if (query.includes("conflict") || query.includes("merge conflict")) {
        reply = "Merge conflicts happen when Git cannot automatically resolve differences in code templates between two commits. You resolve them by opening the affected files, choosing which lines to keep, removing the conflict markers (<<<<<<<, =======, >>>>>>>), and then staging and committing the resolved files.";
      } else if (query.includes("gsoc") || query.includes("summer of code")) {
        reply = "Google Summer of Code (GSoC) is a global, online program focused on bringing new contributors into open-source software development. Contributors work on a 12+ week programming project with an open-source organization under the guidance of mentors.";
      } else if (query.includes("hacktoberfest")) {
        reply = "Hacktoberfest is an annual event in October that encourages people to contribute to open-source projects. Merging 4 valid PRs during the month typically earns participants rewards like custom shirts or digital badges!";
      }

      setChatHistory((prev) => [...prev, { role: "assistant", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans pb-32">
      <div className="mb-12 border-b border-[#2a2d36] pb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-400">Find quick answers or ask our AI open-source companion.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Accordions */}
        <div className="lg:col-span-2 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#1a1d24] border border-[#2a2d36] rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-white font-semibold hover:bg-[#20242d] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="text-orange-500 w-5 h-5 shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 border-t border-[#2a2d36] bg-[#15171e]/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* AI Copilot Helper Card */}
        <div className="flex flex-col h-[500px] bg-[#1a1d24] border border-[#2a2d36] rounded-xl overflow-hidden">
          <div className="bg-[#1f232c] p-4 border-b border-[#2a2d36] flex items-center gap-2">
            <Sparkles className="text-orange-500 w-5 h-5" />
            <h3 className="font-bold text-white text-sm">AI Open Source Coach</h3>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
            {chatHistory.map((chat, idx) => {
              const isAssistant = chat.role === "assistant";
              return (
                <div
                  key={idx}
                  className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                    isAssistant
                      ? "bg-[#2a2d36] text-white self-start"
                      : "bg-orange-500 text-white self-end"
                  }`}
                >
                  {chat.text}
                </div>
              );
            })}
            {isTyping && (
              <div className="bg-[#2a2d36] text-white self-start rounded-lg p-3 text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleChatSubmit} className="p-3 border-t border-[#2a2d36] bg-[#12141a] flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask anything..."
              className="bg-[#0f1115] text-xs text-white placeholder-gray-500 border border-[#2a2d36] rounded-md px-3 py-2 w-full focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="p-2 bg-orange-500 hover:bg-orange-600 rounded-md text-white transition-colors"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
