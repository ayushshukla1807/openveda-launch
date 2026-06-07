"use client";

import { useState } from "react";
import { Copy, Check, Terminal as TerminalIcon, Laptop, HardDrive, Package, AlertCircle } from "lucide-react";

interface InstallationGuide {
  title: string;
  desc: string;
  osInstructions: {
    windows: React.ReactNode;
    mac: React.ReactNode;
    linux: React.ReactNode;
  };
  installCmds: {
    windows?: string;
    mac: string;
    linux: string;
  };
}

export default function ToolsPage() {
  const [activeOS, setActiveOS] = useState<"windows" | "mac" | "linux">("mac");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    git: false,
    github: false,
    vscode: false,
    node: false,
    docker: false
  });

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toolsData: InstallationGuide[] = [
    {
      title: "Git - Version Control System",
      desc: "Git is the absolute foundation of open-source collaboration. It tracks code changes and coordinates work between developers.",
      osInstructions: {
        windows: (
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-300">
            <li>Download the official installer from <a href="https://git-scm.com" target="_blank" rel="noreferrer" className="text-orange-400 hover:underline">git-scm.com</a>.</li>
            <li>Run the installer and click through the wizard. We recommend leaving all default options selected.</li>
            <li>Verify your setup by launching Command Prompt and typing <code className="bg-[#2a2d36] px-1 py-0.5 rounded text-orange-400 font-mono text-xs">git --version</code>.</li>
          </ol>
        ),
        mac: (
          <div className="space-y-2 text-sm text-gray-300">
            <p>Using Homebrew (Recommended):</p>
            <p>Or install via Xcode command line tools by running:</p>
          </div>
        ),
        linux: (
          <div className="space-y-2 text-sm text-gray-300">
            <p>Install via your distribution package manager (apt for Debian/Ubuntu, dnf for Fedora):</p>
          </div>
        )
      },
      installCmds: {
        mac: "brew install git",
        linux: "sudo apt-get install git"
      }
    },
    {
      title: "Node.js & npm (Node Package Manager)",
      desc: "Required for compiling, running, and installing dependencies for Next.js, React, and other JavaScript applications.",
      osInstructions: {
        windows: (
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-300">
            <li>Download the LTS installer from <a href="https://nodejs.org" target="_blank" rel="noreferrer" className="text-orange-400 hover:underline">nodejs.org</a>.</li>
            <li>Run the installer and make sure NPM is checked.</li>
            <li>Verify installation: <code className="bg-[#2a2d36] px-1 py-0.5 rounded text-orange-400 font-mono text-xs">node -v</code> and <code className="bg-[#2a2d36] px-1 py-0.5 rounded text-orange-400 font-mono text-xs">npm -v</code>.</li>
          </ol>
        ),
        mac: (
          <div className="space-y-2 text-sm text-gray-300">
            <p>Install Node.js via Homebrew Package Manager:</p>
          </div>
        ),
        linux: (
          <div className="space-y-2 text-sm text-gray-300">
            <p>Install Node.js via NodeSource binary distributions:</p>
          </div>
        )
      },
      installCmds: {
        mac: "brew install node",
        linux: "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs"
      }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans pb-32">
      <div className="mb-12 border-b border-[#2a2d36] pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-4 font-sans">Essential Tools for Contributing</h1>
          <p className="text-xl text-gray-400 font-sans">A comprehensive guide to the tools you need for open-source contributions.</p>
        </div>

        {/* OS Toggle Buttons */}
        <div className="flex gap-1.5 bg-[#1a1d24] border border-[#2a2d36] p-1.5 rounded-lg shrink-0">
          {(["windows", "mac", "linux"] as const).map((os) => (
            <button
              key={os}
              onClick={() => setActiveOS(os)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${
                activeOS === os ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {os === "mac" ? "macOS" : os}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Guides */}
        <div className="lg:col-span-2 space-y-12">
          {toolsData.map((tool, index) => {
            const hasCmd = activeOS !== "windows" || tool.installCmds.windows;
            const cmd = activeOS === "windows" ? tool.installCmds.windows : activeOS === "mac" ? tool.installCmds.mac : tool.installCmds.linux;
            const uniqueId = `tool-${index}`;

            return (
              <section key={index} className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Laptop className="text-orange-500 w-6 h-6" /> {tool.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">{tool.desc}</p>

                <div className="bg-[#15171e]/50 border border-[#2a2d36] rounded-xl p-5 space-y-4">
                  {/* Step Instructions */}
                  {tool.osInstructions[activeOS]}

                  {/* Commands */}
                  {hasCmd && cmd && (
                    <div className="bg-[#0b0c10] border border-[#2a2d36] p-4 rounded-lg flex items-center justify-between font-mono text-xs text-orange-400 mt-4">
                      <span>{cmd}</span>
                      <button
                        onClick={() => handleCopy(cmd, uniqueId)}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        {copiedId === uniqueId ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          {/* Code Editors & Misc Tools */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <HardDrive className="text-orange-500 w-6 h-6" /> Code Editors & Workspace
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#1a1d24] border border-[#2a2d36] space-y-2">
                <h4 className="font-bold text-white">Visual Studio Code (Recommended)</h4>
                <p className="text-xs text-gray-400">The industry standard. Offers excellent extension library, Git visual diff integration, and remote developer containers.</p>
                <a href="https://code.visualstudio.com" target="_blank" rel="noreferrer" className="text-orange-400 text-xs font-semibold hover:underline block pt-2">Download VS Code →</a>
              </div>
              <div className="p-5 rounded-xl bg-[#1a1d24] border border-[#2a2d36] space-y-2">
                <h4 className="font-bold text-white">Alternative Editors</h4>
                <p className="text-xs text-gray-400">Consider WebStorm, IntelliJ IDEA, or lightweight terminal-based configurations like Neovim for quick patch submissions.</p>
              </div>
            </div>
          </section>

          {/* Docker & Postman */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Package className="text-orange-500 w-6 h-6" /> Additional Useful Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-[#1a1d24] border border-[#2a2d36] space-y-2">
                <h4 className="font-bold text-white text-sm">Postman / Insomnia</h4>
                <p className="text-xs text-gray-400">Essential for testing API requests, payloads, and response schemas on OpenVeda FastAPI backends.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#1a1d24] border border-[#2a2d36] space-y-2">
                <h4 className="font-bold text-white text-sm">Docker Engine</h4>
                <p className="text-xs text-gray-400">Build, share, and spin up microservice environments locally inside reproducible lightweight containers.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#1a1d24] border border-[#2a2d36] space-y-2">
                <h4 className="font-bold text-white text-sm">Markdown Editors</h4>
                <p className="text-xs text-gray-400">Useful for organizing and previewing docs, writing clean issue reports, and documenting PR summaries.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Side Checklist Column */}
        <div>
          <div className="bg-[#1a1d24] border border-[#2a2d36] rounded-2xl p-6 sticky top-6">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <TerminalIcon size={18} className="text-orange-500" /> Environment Checklist
            </h3>
            <p className="text-xs text-gray-400 mb-6">Track your system setup progress. Mark items when successfully installed.</p>

            <div className="space-y-4">
              {[
                { id: "git", label: "Git Installed & Configured" },
                { id: "github", label: "GitHub Account Configured" },
                { id: "vscode", label: "VS Code Editor Configured" },
                { id: "node", label: "Node.js & NPM Setup" },
                { id: "docker", label: "Docker Installed (Optional)" }
              ].map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#2a2d36] hover:bg-[#1f222b] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checklist[item.id]}
                    onChange={() => toggleCheck(item.id)}
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-orange-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className={`text-xs font-semibold ${checklist[item.id] ? "text-gray-500 line-through" : "text-gray-300"}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex gap-2">
              <AlertCircle className="text-orange-500 shrink-0 mt-0.5 w-4 h-4" />
              <p className="text-[10px] text-orange-200/80 leading-relaxed">
                Ensure SSH keys are set up on GitHub to permit seamless authenticated code pushes without password requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
