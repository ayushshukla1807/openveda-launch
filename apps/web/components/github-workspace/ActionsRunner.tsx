'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RefreshCw, Terminal, CheckCircle2, XCircle, 
  Loader2, AlertTriangle, FileCode, PlayCircle, Settings, 
  TerminalSquare, Download, Layers 
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  duration?: number;
  logs: string[];
}

interface Workflow {
  id: string;
  name: string;
  yaml: string;
  steps: WorkflowStep[];
}

const WORKFLOWS_PRESETS: Workflow[] = [
  {
    id: 'nextjs-prod',
    name: 'Next.js Production Build & Deploy',
    yaml: `name: Next.js CI/CD Pipeline
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Run ESLint Audits
        run: npm run lint
      
      - name: Compile Next.js Server
        run: npm run build
      
      - name: Deploy to Vercel/Netlify Edge
        uses: amondo/vercel-deploy-action@v2`,
    steps: [
      { id: 'chk', name: 'Checkout Repository', status: 'idle', logs: [] },
      { id: 'env', name: 'Setup Node.js Environment', status: 'idle', logs: [] },
      { id: 'dep', name: 'Install Dependencies', status: 'idle', logs: [] },
      { id: 'lnt', name: 'Run ESLint Audits', status: 'idle', logs: [] },
      { id: 'bld', name: 'Compile Next.js Server', status: 'idle', logs: [] },
      { id: 'dpl', name: 'Deploy to Vercel/Netlify Edge', status: 'idle', logs: [] }
    ]
  },
  {
    id: 'python-fastapi',
    name: 'FastAPI Backend PyTest Suite',
    yaml: `name: Python FastAPI CI
on:
  pull_request:
    branches: [ main ]

jobs:
  pytest:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      
      - name: Setup Python Runtime
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install UV Package Manager
        run: curl -LsSf https://astral.sh/uv/install.sh | sh
      
      - name: Install dependencies
        run: uv pip install -r requirements.txt
      
      - name: Run PyTest Assertions
        run: pytest tests/ -vv`,
    steps: [
      { id: 'chk', name: 'Checkout Code', status: 'idle', logs: [] },
      { id: 'env', name: 'Setup Python Runtime', status: 'idle', logs: [] },
      { id: 'uvm', name: 'Install UV Package Manager', status: 'idle', logs: [] },
      { id: 'dep', name: 'Install dependencies', status: 'idle', logs: [] },
      { id: 'tst', name: 'Run PyTest Assertions', status: 'idle', logs: [] }
    ]
  },
  {
    id: 'java-maven',
    name: 'Java Spring Boot Maven Compile',
    yaml: `name: Java Maven CI
on: [push]

jobs:
  maven-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      
      - name: Setup JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
      
      - name: Cache Maven Dependencies
        uses: actions/cache@v4
      
      - name: Build with Maven
        run: ./mvnw clean package`,
    steps: [
      { id: 'chk', name: 'Checkout Code', status: 'idle', logs: [] },
      { id: 'env', name: 'Setup JDK 17', status: 'idle', logs: [] },
      { id: 'cch', name: 'Cache Maven Dependencies', status: 'idle', logs: [] },
      { id: 'mvn', name: 'Build with Maven', status: 'idle', logs: [] }
    ]
  }
];

export default function ActionsRunner() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>({ ...WORKFLOWS_PRESETS[0] });
  const [activeWorkflowId, setActiveWorkflowId] = useState('nextjs-prod');
  const [steps, setSteps] = useState<WorkflowStep[]>([ ...WORKFLOWS_PRESETS[0].steps ]);
  const [running, setRunning] = useState(false);
  const [activeStepIdx, setActiveStepIdx] = useState<number | null>(null);
  
  // Custom execution knobs
  const [injectError, setInjectError] = useState(false);
  const [errorStepId, setErrorStepId] = useState('bld');
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [workflowStatus, setWorkflowStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Sync current presets on selection change
    const preset = WORKFLOWS_PRESETS.find(w => w.id === activeWorkflowId);
    if (preset) {
      setSelectedWorkflow({ ...preset });
      setSteps(preset.steps.map(s => ({ ...s, status: 'idle', logs: [] })));
      setPipelineLogs([`[RUNNER] Loaded pipeline configuration: ${preset.name}`, `[RUNNER] Click 'Run Workflow' to execute.`]);
      setWorkflowStatus('idle');
      setTotalElapsedTime(0);
      setActiveStepIdx(null);
      setRunning(false);
      stopTimers();
    }
  }, [activeWorkflowId]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pipelineLogs]);

  const stopTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
  };

  const handleStartWorkflow = () => {
    if (running) return;

    // Reset steps state
    const cleanSteps = steps.map(s => ({ ...s, status: 'idle' as const, logs: [] }));
    setSteps(cleanSteps);
    setRunning(true);
    setWorkflowStatus('running');
    setTotalElapsedTime(0);
    setPipelineLogs([
      `\u001b[1;36m[RUNNER] Starting GitHub Actions Virtual Runner v2.4.1\u001b[0m`,
      `[RUNNER] Operating System: Ubuntu 22.04.4 LTS (Jammy Jellyfish)`,
      `[RUNNER] Virtual CPU: Intel Core mock processor (4 cores)`,
      `[RUNNER] System Memory: 16 GB allocated`,
      `[RUNNER] Triggered by push event on branch main`,
      `----------------------------------------------------------------------`
    ]);

    // Start timer counter
    timerRef.current = setInterval(() => {
      setTotalElapsedTime(prev => prev + 1);
    }, 1000);

    // Run first step
    executeStep(0, cleanSteps);
  };

  const executeStep = (idx: number, currentSteps: WorkflowStep[]) => {
    if (idx >= currentSteps.length) {
      // End of pipeline
      stopTimers();
      setRunning(false);
      setWorkflowStatus('success');
      setPipelineLogs(prev => [
        ...prev,
        `----------------------------------------------------------------------`,
        `\u001b[1;32m[SUCCESS] Workflow completed successfully in ${totalElapsedTime}s!\u001b[0m`,
        `[SUCCESS] Artifacts archived. Deployments synced.`
      ]);
      return;
    }

    setActiveStepIdx(idx);
    
    // Update step status to running
    const stepsWithActive = currentSteps.map((s, sIdx) => {
      if (sIdx === idx) return { ...s, status: 'running' as const };
      return s;
    });
    setSteps(stepsWithActive);

    const activeStep = stepsWithActive[idx];
    setPipelineLogs(prev => [...prev, `\u001b[1;33m[JOB] Starting step: ${activeStep.name}\u001b[0m`]);

    // Stream logs for the active step
    const stepLogsPreset = getStepLogsPreset(activeStep.id, activeWorkflowId);
    let logLineIdx = 0;
    
    const logInterval = setInterval(() => {
      if (logLineIdx < stepLogsPreset.length) {
        // Stream log line
        const line = stepLogsPreset[logLineIdx];
        setPipelineLogs(prev => [...prev, `  ${line}`]);
        logLineIdx++;
      } else {
        // Log stream finished for this step
        clearInterval(logInterval);

        // Check if error needs to be injected on this step
        const isErrorInjected = injectError && activeStep.id === errorStepId;

        if (isErrorInjected) {
          // Fail this step
          stopTimers();
          setRunning(false);
          setWorkflowStatus('failed');
          
          const failedSteps = stepsWithActive.map((s, sIdx) => {
            if (sIdx === idx) return { ...s, status: 'failed' as const };
            return s;
          });
          setSteps(failedSteps);

          setPipelineLogs(prev => [
            ...prev,
            `\u001b[1;31m[ERROR] Process completed with exit code 1.\u001b[0m`,
            `\u001b[1;31m[ERROR] Step '${activeStep.name}' failed. Aborting pipeline build.\u001b[0m`,
            `----------------------------------------------------------------------`,
            `\u001b[1;31m[FAILED] Workflow run failed.\u001b[0m`
          ]);
        } else {
          // Succeed this step and move to next
          const succeededSteps = stepsWithActive.map((s, sIdx) => {
            if (sIdx === idx) return { ...s, status: 'success' as const, duration: Math.floor(Math.random() * 4) + 1 };
            return s;
          });
          setSteps(succeededSteps);
          setPipelineLogs(prev => [...prev, `\u001b[1;32m[JOB] Step complete: ${activeStep.name} (success)\u001b[0m`, ``]);

          // Move to next step with slight offset
          stepTimerRef.current = setTimeout(() => {
            executeStep(idx + 1, succeededSteps);
          }, 600);
        }
      }
    }, 250);
  };

  const getStepLogsPreset = (stepId: string, workflowId: string): string[] => {
    switch (stepId) {
      case 'chk':
        return [
          `git init /home/runner/work/openveda/openveda`,
          `git remote add origin https://github.com/ayushshukla1807/openveda-launch.git`,
          `git fetch --no-tags --prune --progress --no-recurse-submodules --depth=1 origin +refs/heads/main:refs/remotes/origin/main`,
          `git checkout --force -B main refs/remotes/origin/main`,
          `HEAD is now at 9f2a4c1 docs: update project README and system layouts`
        ];

      case 'env':
        if (workflowId === 'nextjs-prod') {
          return [
            `Found in cache: Node.js version v20.12.2`,
            `Resolving npm credentials...`,
            `Environment configuration set. PATH updated.`
          ];
        } else if (workflowId === 'python-fastapi') {
          return [
            `Fetching Python release binary version 3.11.8...`,
            `Extracting tarball to /opt/hostedtoolcache/Python/3.11.8/x64`,
            `Successfully configured Python path variables.`
          ];
        } else {
          return [
            `Downloading JDK 17 (Temurin) package binaries...`,
            `Setting up java-17-openjdk-amd64 configuration...`,
            `JAVA_HOME points to /usr/lib/jvm/java-17-openjdk-amd64`
          ];
        }

      case 'dep':
        if (workflowId === 'nextjs-prod') {
          return [
            `npm ci --prefer-offline --no-audit --progress=false`,
            `added 1042 packages in 3.42s`,
            `found 0 vulnerabilities`
          ];
        } else {
          return [
            `uv pip install -r requirements.txt`,
            `Resolving dependencies...`,
            `Audited 34 packages, downloaded 12 package caches.`,
            `Successfully installed: fastapi-0.109.2 pydantic-2.6.1 uvicorn-0.27.1`
          ];
        }

      case 'uvm':
        return [
          `Downloading uv installer script...`,
          `Installing uv binary to /home/runner/.cargo/bin/uv`,
          `uv version 0.1.25 configured.`
        ];

      case 'cch':
        return [
          `Checking configuration keys for maven caching...`,
          `Cache mismatch. Maven artifacts directory not found.`,
          `Pipeline will build fresh package repositories.`
        ];

      case 'lnt':
        return [
          `npm run lint`,
          `> eslint "src/**/*.{js,ts,tsx}"`,
          `All 42 source files scanned cleanly. 0 warnings, 0 errors.`
        ];

      case 'bld':
        return [
          `next build`,
          `  ▲ Next.js 14.2.33`,
          `  - Creating optimized production build ...`,
          `  - Compiled successfully`,
          `  - Collecting page data ...`,
          `  - Generating static pages (25/25) ...`,
          `  Route (app)                              Size     First Load JS`,
          `  ┌ ○ /                                    5.4 kB         114 kB`,
          `  ├ ○ /dashboard                           12.4 kB        124 kB`,
          `  └ ○ /playground                          84 kB          188 kB`
        ];

      case 'dpl':
        return [
          `Deploying payload to Vercel/Netlify edges...`,
          `Syncing assets manifest (25 files)`,
          `Uploading webpack bundles...`,
          `\u001b[1;32m[DEPLOY] Production URL: https://openveda.in (verified)\u001b[0m`,
          `Deployment success.`
        ];

      case 'tst':
        return [
          `pytest tests/ -vv`,
          `=================== test session starts ===================`,
          `platform linux -- Python 3.11.8, pytest-7.4.4`,
          `rootdir: /home/runner/work/openveda/openveda`,
          `collected 14 items`,
          ``,
          `tests/test_fastapi.py::test_read_root \u001b[32mPASSED\u001b[0m [  7% ]`,
          `tests/test_fastapi.py::test_vector_similarity \u001b[32mPASSED\u001b[0m [ 21% ]`,
          `tests/test_fastapi.py::test_rag_pipeline_latency \u001b[32mPASSED\u001b[0m [ 35% ]`,
          `tests/test_fastapi.py::test_db_shard_read \u001b[32mPASSED\u001b[0m [ 50% ]`,
          `tests/test_fastapi.py::test_auth_session_cookie \u001b[32mPASSED\u001b[0m [ 64% ]`,
          `tests/test_fastapi.py::test_curriculum_indexing \u001b[32mPASSED\u001b[0m [ 78% ]`,
          `tests/test_fastapi.py::test_burnout_classifier \u001b[32mPASSED\u001b[0m [ 100% ]`,
          `==================== \u001b[32m14 passed\u001b[0m in 1.42s =====================`
        ];

      case 'mvn':
        return [
          `./mvnw clean package`,
          `[INFO] Scanning for projects...`,
          `[INFO] Building openveda-core 0.1.0-SNAPSHOT`,
          `[INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile) ---`,
          `[INFO] Compiling 24 source files to target/classes`,
          `[INFO] --- maven-surefire-plugin:2.22.2:test (default-test) ---`,
          `[INFO] Running com.openveda.core.ApplicationTests`,
          `[INFO] Tests run: 8, Failures: 0, Errors: 0, Skipped: 0`,
          `[INFO] \u001b[1;32mBUILD SUCCESS\u001b[0m`
        ];

      default:
        return [`Executing generic build task...`, `Step completed successfully.`];
    }
  };

  const getWorkflowConfigText = () => {
    return selectedWorkflow.yaml;
  };

  return (
    <div className="space-y-8 min-h-[75vh]">
      
      {/* Control center banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 glass p-6 rounded-3xl border border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Actions Runner Sandbox</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            CI/CD Pipeline compilation runner. Load workflow configs, track jobs, stream colored logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Preset list selector */}
          <div className="flex items-center bg-black/40 border border-white/5 rounded-xl px-3 py-2">
            <Settings className="w-3.5 h-3.5 text-gray-500 mr-2 shrink-0" />
            <select
              value={activeWorkflowId}
              onChange={(e) => setActiveWorkflowId(e.target.value)}
              className="bg-transparent text-xs text-white border-none outline-none focus:ring-0 w-48 font-bold"
              disabled={running}
            >
              {WORKFLOWS_PRESETS.map(w => (
                <option key={w.id} value={w.id} className="bg-neutral-900">{w.name}</option>
              ))}
            </select>
          </div>

          {/* Start button */}
          <button 
            onClick={handleStartWorkflow}
            disabled={running}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              running
                ? 'bg-white/5 text-gray-400 border border-white/5 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/80 text-white hover:scale-105 active:scale-95 shadow-lg shadow-primary/20'
            }`}
          >
            {running ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Running Workflow...</span>
              </>
            ) : (
              <>
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Run Workflow</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: YAML and Step Tracker list */}
        <div className="xl:col-span-1 space-y-8">
          
          {/* YAML Config view */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <FileCode className="w-4 h-4 text-primary" />
              <span>Workflow YAML configuration</span>
            </h4>
            <div className="bg-black/40 rounded-2xl p-4 border border-white/5 font-mono text-[10px] text-gray-400 h-64 overflow-y-auto leading-relaxed select-text">
              <pre>{getWorkflowConfigText()}</pre>
            </div>
          </div>

          {/* Job Steps visual tracker */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00f0ff]" />
              <span>Execution Pipeline steps</span>
            </h4>
            
            <div className="space-y-3 pt-2">
              {steps.map((step, idx) => {
                let statusIcon = <div className="w-5 h-5 rounded-full border border-white/10 bg-white/5 shrink-0" />;
                let stepColor = 'text-gray-400';
                
                if (step.status === 'running') {
                  statusIcon = <Loader2 className="w-5 h-5 text-[#00f0ff] animate-spin shrink-0" />;
                  stepColor = 'text-[#00f0ff] font-bold';
                } else if (step.status === 'success') {
                  statusIcon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 fill-emerald-950/20" />;
                  stepColor = 'text-white';
                } else if (step.status === 'failed') {
                  statusIcon = <XCircle className="w-5 h-5 text-red-500 shrink-0 fill-red-950/20" />;
                  stepColor = 'text-red-400 font-bold';
                }

                return (
                  <div 
                    key={step.id} 
                    className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 transition-all bg-white/[0.01] ${
                      step.status === 'running' ? 'bg-[#00f0ff]/5 border-[#00f0ff]/20' : ''
                    }`}
                  >
                    {statusIcon}
                    <div className="flex-grow min-w-0">
                      <div className={`text-xs ${stepColor} truncate`}>{step.name}</div>
                      {step.duration && (
                        <div className="text-[9px] text-gray-500 font-mono">Duration: {step.duration}s</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Terminal Console Log stream */}
        <div className="xl:col-span-2 space-y-8 flex flex-col">
          
          {/* Build Terminal block */}
          <div className="glass p-6 rounded-3xl border border-white/5 flex-grow flex flex-col justify-between min-h-[480px] bg-black/60">
            
            {/* Terminal Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/5 pb-4 mb-4 gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans">
                  Action Build logs console
                </span>
              </div>

              {/* Console status flags */}
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-gray-500">
                  BUILD STATUS:
                </span>
                
                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${
                  workflowStatus === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : workflowStatus === 'failed'
                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                    : workflowStatus === 'running'
                    ? 'bg-sky-500/10 text-sky-400 border-sky-500/20 animate-pulse'
                    : 'bg-white/5 text-gray-500 border-white/5'
                }`}>
                  {workflowStatus}
                </span>

                {totalElapsedTime > 0 && (
                  <span className="text-[9px] font-mono text-white bg-white/5 px-2.5 py-0.5 rounded-lg">
                    {totalElapsedTime}s elapsed
                  </span>
                )}
              </div>
            </div>

            {/* Scrollable logs list */}
            <div className="flex-grow overflow-y-auto space-y-2.5 font-mono text-[10px] pr-2 max-h-[360px] leading-relaxed select-text">
              {pipelineLogs.map((log, idx) => {
                // Parse ANSI colors (simplified parser for simulator UI)
                let text = log;
                let textColor = 'text-gray-300';
                
                if (log.includes('\u001b[1;36m')) {
                  text = log.replace(/\u001b\[1;36m/g, '').replace(/\u001b\[0m/g, '');
                  textColor = 'text-sky-400 font-bold';
                } else if (log.includes('\u001b[1;32m') || log.includes('[DEPLOY]')) {
                  text = log.replace(/\u001b\[1;32m/g, '').replace(/\u001b\[0m/g, '');
                  textColor = 'text-emerald-400 font-bold';
                } else if (log.includes('\u001b[1;31m') || log.includes('[ERROR]')) {
                  text = log.replace(/\u001b\[1;31m/g, '').replace(/\u001b\[0m/g, '');
                  textColor = 'text-red-400 font-bold';
                } else if (log.includes('\u001b[1;33m') || log.includes('[JOB]')) {
                  text = log.replace(/\u001b\[1;33m/g, '').replace(/\u001b\[0m/g, '');
                  textColor = 'text-yellow-500 font-bold';
                } else if (log.includes('PASSED')) {
                  textColor = 'text-emerald-400';
                } else if (log.includes('FAILED')) {
                  textColor = 'text-red-400';
                }

                return (
                  <div key={idx} className={textColor}>
                    {text}
                  </div>
                );
              })}
              <div ref={logsEndRef} />
            </div>

            {/* Error Injection Panel (Knobs) */}
            <div className="mt-4 border-t border-white/5 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="inject-err-check"
                    checked={injectError}
                    onChange={(e) => setInjectError(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-white/10 bg-black/40 text-primary focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="inject-err-check" className="text-[10px] font-black uppercase tracking-widest text-red-400 cursor-pointer select-none flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    <span>Inject Build Failure</span>
                  </label>
                </div>

                {injectError && (
                  <div className="flex items-center bg-black/40 border border-white/5 rounded-lg px-2.5 py-1">
                    <span className="text-[9px] text-gray-500 mr-2">STEP:</span>
                    <select
                      value={errorStepId}
                      onChange={(e) => setErrorStepId(e.target.value)}
                      className="bg-transparent text-[9px] text-white border-none outline-none p-0 w-28 font-bold"
                    >
                      {steps.slice(2).map(s => (
                        <option key={s.id} value={s.id} className="bg-neutral-900">{s.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="text-[9px] font-mono text-gray-500 italic">
                Environment: Ubuntu_22_Runner_CI
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
