'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitCommit, GitBranch, GitMerge, RefreshCw, Terminal, 
  HelpCircle, Check, Play, BookOpen, AlertTriangle, ArrowRight 
} from 'lucide-react';

interface Commit {
  id: string;
  message: string;
  parents: string[];
  branch: string;
  x: number;
  y: number;
  color: string;
  timestamp: string;
  author: string;
}

interface GitBranchState {
  name: string;
  head: string;
  color: string;
}

const BRANCH_COLORS = [
  '#ff5733', // Orange (main)
  '#00f0ff', // Cyan (feature)
  '#a855f7', // Purple (hotfix)
  '#22c55e', // Green (release)
  '#eab308', // Yellow (experimental)
  '#ec4899', // Pink (dev)
];

const TUTORIAL_STEPS = [
  {
    title: 'Welcome to Git Forge',
    desc: 'Learn Git branching and merging visually. Run commands in the terminal or click visual shortcuts.',
    cmd: 'git status',
    target: 'Learn the basics'
  },
  {
    title: 'Create Your First Feature Branch',
    desc: 'Create and switch to a new branch named "feature/analytics" to isolate your changes.',
    cmd: 'git checkout -b feature/analytics',
    target: 'Create branch'
  },
  {
    title: 'Make a Commit',
    desc: 'Stage and commit changes on your new branch to record history.',
    cmd: 'git commit -m "feat: add real-time repository charts"',
    target: 'Commit changes'
  },
  {
    title: 'Switch Back to Main',
    desc: 'Checkout the "main" branch before merging or rebasing.',
    cmd: 'git checkout main',
    target: 'Switch to main'
  },
  {
    title: 'Merge the Feature',
    desc: 'Integrate changes from your feature branch back into main using a merge commit.',
    cmd: 'git merge feature/analytics',
    target: 'Merge branches'
  }
];

export default function GitGraphVisualizer() {
  // In-memory Git state
  const [commits, setCommits] = useState<Commit[]>([]);
  const [branches, setBranches] = useState<Record<string, GitBranchState>>({});
  const [currentBranch, setCurrentBranch] = useState('main');
  const [headCommit, setHeadCommit] = useState<string>('');
  
  // Staging area
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [unstagedFiles, setUnstagedFiles] = useState<string[]>(['src/components/telemetry.tsx', 'package.json']);
  
  // Console CLI state
  const [cliInput, setCliInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ text: string; type: 'cmd' | 'output' | 'error' | 'success' }>>([
    { text: 'Git Forge Shell v1.0.0 initialized.', type: 'output' },
    { text: 'Type "help" or click the Help button to see list of valid commands.', type: 'output' },
    { text: 'Try "git log" or "git status" to inspect current environment.', type: 'output' },
  ]);

  // UI States
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [visualizationScale, setVisualizationScale] = useState(1);
  
  const consoleBottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize repo
  useEffect(() => {
    resetRepository();
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  const resetRepository = () => {
    const rootId = 'c1a0b3e';
    const initialCommits: Commit[] = [
      {
        id: rootId,
        message: 'Initial repository commit',
        parents: [],
        branch: 'main',
        x: 0,
        y: 400,
        color: BRANCH_COLORS[0],
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        author: 'ayushshukla1807'
      },
      {
        id: '9f2a4c1',
        message: 'docs: update project README and system layouts',
        parents: [rootId],
        branch: 'main',
        x: 0,
        y: 300,
        color: BRANCH_COLORS[0],
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
        author: 'ayushshukla1807'
      }
    ];

    const initialBranches: Record<string, GitBranchState> = {
      main: { name: 'main', head: '9f2a4c1', color: BRANCH_COLORS[0] }
    };

    setCommits(initialCommits);
    setBranches(initialBranches);
    setCurrentBranch('main');
    setHeadCommit('9f2a4c1');
    setStagedFiles([]);
    setUnstagedFiles(['src/components/telemetry.tsx', 'package.json']);
    setSelectedCommit(null);
    setTerminalLogs([
      { text: 'Repository reset. Created main branch with initial commit history.', type: 'success' },
      { text: '$ git status', type: 'cmd' },
      { text: 'On branch main\nYour branch is up to date.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n\tmodified:   src/components/telemetry.tsx\n\tmodified:   package.json\n\nno changes added to commit (use "git add" and/or "git commit")', type: 'output' }
    ]);
  };

  // Helper to add log entries
  const addLog = (text: string, type: 'cmd' | 'output' | 'error' | 'success' = 'output') => {
    setTerminalLogs(prev => [...prev, { text, type }]);
  };

  // Calculate coordinates for rendering
  const recalculateCoordinates = (updatedCommits: Commit[], updatedBranches: Record<string, GitBranchState>) => {
    const branchLanes: string[] = ['main'];
    const branchDepths: Record<string, number> = {};

    // Get order of branches based on commits
    updatedCommits.forEach(c => {
      if (!branchLanes.includes(c.branch)) {
        branchLanes.push(c.branch);
      }
    });

    // Sort commits topologically: parent must be drawn before child, but visually, newer commits are on top.
    // We will lay out sequentially.
    const commitMap = new Map<string, Commit>();
    updatedCommits.forEach(c => commitMap.set(c.id, c));

    // Resolve vertical lines (Y coordinates).
    // Let's draw the oldest commit at the bottom (e.g. Y = 500) and move upwards.
    // We can do a BFS/DFS or simple grid based on ancestry distance.
    const parentCount: Record<string, number> = {};
    const childMap = new Map<string, string[]>();
    
    updatedCommits.forEach(c => {
      parentCount[c.id] = c.parents.length;
      c.parents.forEach(p => {
        if (!childMap.has(p)) childMap.set(p, []);
        childMap.get(p)!.push(c.id);
      });
    });

    const queue: string[] = [];
    const heights: Record<string, number> = {};
    
    // Find roots
    updatedCommits.forEach(c => {
      if (c.parents.length === 0) {
        queue.push(c.id);
        heights[c.id] = 0;
      }
    });

    let maxDepth = 0;
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const currentHeight = heights[currentId];
      maxDepth = Math.max(maxDepth, currentHeight);

      const children = childMap.get(currentId) || [];
      children.forEach(childId => {
        // Child's height must be greater than current parent's height
        const candidateHeight = currentHeight + 1;
        if (heights[childId] === undefined || heights[childId] < candidateHeight) {
          heights[childId] = candidateHeight;
          queue.push(childId);
        }
      });
    }

    const laneSpacing = 110;
    const verticalSpacing = 70;
    const bottomY = Math.max(450, maxDepth * verticalSpacing + 80);

    return updatedCommits.map(c => {
      const laneIndex = branchLanes.indexOf(c.branch);
      const x = 70 + laneIndex * laneSpacing;
      
      const depth = heights[c.id] !== undefined ? heights[c.id] : 0;
      const y = bottomY - depth * verticalSpacing;
      
      const branchColor = updatedBranches[c.branch]?.color || '#ff5733';

      return {
        ...c,
        x,
        y,
        color: branchColor
      };
    });
  };

  const executeGitCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    addLog(`$ ${trimmed}`, 'cmd');
    setCliInput('');

    // Help command
    if (trimmed.toLowerCase() === 'help') {
      addLog(
        `Supported Commands:\n` +
        `  git status                      - Inspect working directory & branch status\n` +
        `  git add <filename> | .          - Stage modified files for commit\n` +
        `  git commit -m "your message"    - Commit staged changes to history\n` +
        `  git branch                      - List branches in repository\n` +
        `  git branch <branch-name>        - Create a new branch\n` +
        `  git branch -d <branch-name>     - Delete a branch\n` +
        `  git checkout <branch-name>      - Switch working HEAD to branch\n` +
        `  git checkout -b <branch-name>   - Create and checkout branch\n` +
        `  git merge <branch-name>         - Merge branch into current HEAD\n` +
        `  git rebase <branch-name>        - Rebase current branch on top of target\n` +
        `  git log                         - View commit history logs\n` +
        `  clear                           - Clear terminal output\n` +
        `  reset                           - Reset repository to clean state`,
        'output'
      );
      return;
    }

    // Clear command
    if (trimmed.toLowerCase() === 'clear') {
      setTerminalLogs([]);
      return;
    }

    // Reset command
    if (trimmed.toLowerCase() === 'reset') {
      resetRepository();
      return;
    }

    // Git commands
    if (trimmed.startsWith('git ')) {
      const parts = trimmed.substring(4).split(/\s+/);
      const subCommand = parts[0];

      switch (subCommand) {
        case 'status': {
          let output = `On branch ${currentBranch}\n`;
          if (stagedFiles.length === 0 && unstagedFiles.length === 0) {
            output += `nothing to commit, working tree clean`;
          } else {
            if (stagedFiles.length > 0) {
              output += `Changes to be committed:\n  (use "git restore --staged <file>..." to unstage)\n`;
              stagedFiles.forEach(f => {
                output += `\tnew file:   ${f}\n`;
              });
              output += `\n`;
            }
            if (unstagedFiles.length > 0) {
              output += `Changes not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n`;
              unstagedFiles.forEach(f => {
                output += `\tmodified:   ${f}\n`;
              });
            }
          }
          addLog(output, 'output');
          break;
        }

        case 'add': {
          const fileArg = parts[1];
          if (!fileArg) {
            addLog('Error: Nothing specified, nothing added.', 'error');
            break;
          }
          if (fileArg === '.' || fileArg === '*') {
            if (unstagedFiles.length === 0) {
              addLog('Nothing to stage.', 'output');
            } else {
              setStagedFiles(prev => [...prev, ...unstagedFiles]);
              setUnstagedFiles([]);
              addLog(`Staged ${unstagedFiles.length} file(s).`, 'success');
            }
          } else {
            if (unstagedFiles.includes(fileArg)) {
              setUnstagedFiles(prev => prev.filter(f => f !== fileArg));
              setStagedFiles(prev => [...prev, fileArg]);
              addLog(`Staged file: ${fileArg}`, 'success');
            } else {
              addLog(`Error: pathspec '${fileArg}' did not match any files`, 'error');
            }
          }
          break;
        }

        case 'commit': {
          // Find message -m
          const mIndex = parts.indexOf('-m');
          let commitMsg = '';
          if (mIndex !== -1 && parts[mIndex + 1]) {
            // Join everything after -m or handle quotes
            const fullArgString = parts.slice(mIndex + 1).join(' ');
            const match = fullArgString.match(/['"](.*?)['"]/);
            commitMsg = match ? match[1] : parts[mIndex + 1];
          }

          if (!commitMsg) {
            addLog('Error: commit message required. Use git commit -m "your message"', 'error');
            break;
          }

          if (stagedFiles.length === 0 && unstagedFiles.length > 0) {
            addLog('No changes added to commit (use "git add")', 'error');
            break;
          }
          if (stagedFiles.length === 0 && unstagedFiles.length === 0) {
            addLog('nothing to commit, working tree clean', 'output');
            break;
          }

          // Create new commit
          const nextHash = Math.random().toString(16).substring(2, 9);
          const newCommit: Commit = {
            id: nextHash,
            message: commitMsg,
            parents: headCommit ? [headCommit] : [],
            branch: currentBranch,
            x: 0,
            y: 0,
            color: '#fff', // calculated later
            timestamp: new Date().toISOString(),
            author: 'ayushshukla1807'
          };

          const updatedCommits = [...commits, newCommit];
          const updatedBranches = {
            ...branches,
            [currentBranch]: { ...branches[currentBranch], head: nextHash }
          };

          // Re-render coordinate systems
          const finalCommits = recalculateCoordinates(updatedCommits, updatedBranches);

          setCommits(finalCommits);
          setBranches(updatedBranches);
          setHeadCommit(nextHash);
          setStagedFiles([]);
          
          addLog(`[${currentBranch} ${nextHash}] ${commitMsg}\n ${stagedFiles.length} file(s) changed.`, 'success');
          
          // Trigger tutorial milestone progress if matching step 2 or step 4
          if (activeStep === 2 && currentBranch === 'feature/analytics') {
            advanceTutorial();
          }
          break;
        }

        case 'branch': {
          const branchArg = parts[1];
          const isDelete = parts.includes('-d') || parts.includes('-D');
          
          if (!branchArg) {
            // List branches
            let output = 'Local branches:\n';
            Object.keys(branches).forEach(bName => {
              const prefix = bName === currentBranch ? '* ' : '  ';
              output += `${prefix}${bName}\n`;
            });
            addLog(output, 'output');
            break;
          }

          if (isDelete) {
            const targetDelete = parts.find(p => p !== '-d' && p !== '-D' && p !== 'branch');
            if (!targetDelete || !branches[targetDelete]) {
              addLog(`Error: branch '${targetDelete}' not found.`, 'error');
              break;
            }
            if (targetDelete === currentBranch) {
              addLog(`Error: cannot delete branch '${targetDelete}' checked out at '${branches[targetDelete].head}'`, 'error');
              break;
            }
            const { [targetDelete]: _, ...restBranches } = branches;
            setBranches(restBranches);
            addLog(`Deleted branch ${targetDelete} (was ${branches[targetDelete].head}).`, 'success');
            break;
          }

          // Create branch
          if (branches[branchArg]) {
            addLog(`Error: A branch named '${branchArg}' already exists.`, 'error');
            break;
          }

          const activeColorIndex = Object.keys(branches).length % BRANCH_COLORS.length;
          const newBranches = {
            ...branches,
            [branchArg]: {
              name: branchArg,
              head: headCommit,
              color: BRANCH_COLORS[activeColorIndex]
            }
          };

          setBranches(newBranches);
          const finalCommits = recalculateCoordinates(commits, newBranches);
          setCommits(finalCommits);
          addLog(`Created branch '${branchArg}' starting at ${headCommit.substring(0, 7)}.`, 'success');
          break;
        }

        case 'checkout': {
          const createBranchFlag = parts.includes('-b');
          const targetBranch = createBranchFlag ? parts[parts.indexOf('-b') + 1] : parts[1];

          if (!targetBranch) {
            addLog('Error: Specify a branch name to checkout.', 'error');
            break;
          }

          if (createBranchFlag) {
            if (branches[targetBranch]) {
              addLog(`Error: branch '${targetBranch}' already exists.`, 'error');
              break;
            }

            const activeColorIndex = Object.keys(branches).length % BRANCH_COLORS.length;
            const newBranches = {
              ...branches,
              [targetBranch]: {
                name: targetBranch,
                head: headCommit,
                color: BRANCH_COLORS[activeColorIndex]
              }
            };

            setBranches(newBranches);
            setCurrentBranch(targetBranch);
            
            const finalCommits = recalculateCoordinates(commits, newBranches);
            setCommits(finalCommits);
            addLog(`Switched to a new branch '${targetBranch}'`, 'success');

            if (activeStep === 1 && targetBranch === 'feature/analytics') {
              advanceTutorial();
            }
          } else {
            if (!branches[targetBranch]) {
              addLog(`Error: pathspec '${targetBranch}' did not match any file(s) or branch(es) known to git.`, 'error');
              break;
            }

            setCurrentBranch(targetBranch);
            setHeadCommit(branches[targetBranch].head);
            addLog(`Switched to branch '${targetBranch}'\nYour branch is up to date.`, 'success');

            if (activeStep === 3 && targetBranch === 'main') {
              advanceTutorial();
            }
          }
          break;
        }

        case 'merge': {
          const targetBranch = parts[1];
          if (!targetBranch || !branches[targetBranch]) {
            addLog(`Error: Specify a valid branch name to merge.`, 'error');
            break;
          }

          if (targetBranch === currentBranch) {
            addLog('Already up to date.', 'output');
            break;
          }

          const targetHeadHash = branches[targetBranch].head;
          const currentHeadHash = branches[currentBranch].head;

          // Merge calculation: Find common ancestor
          const ancestor = findCommonAncestor(currentHeadHash, targetHeadHash);
          if (!ancestor) {
            addLog(`Error: No common ancestor found between ${currentBranch} and ${targetBranch}. Merge aborted.`, 'error');
            break;
          }

          // Fast Forward Merge
          if (ancestor === currentHeadHash) {
            const updatedBranches = {
              ...branches,
              [currentBranch]: { ...branches[currentBranch], head: targetHeadHash }
            };
            setBranches(updatedBranches);
            setHeadCommit(targetHeadHash);
            const finalCommits = recalculateCoordinates(commits, updatedBranches);
            setCommits(finalCommits);
            addLog(`Updating ${currentHeadHash.substring(0, 7)}..${targetHeadHash.substring(0, 7)}\nFast-forward merge complete.`, 'success');
            
            if (activeStep === 4 && targetBranch === 'feature/analytics') {
              advanceTutorial();
            }
            break;
          }

          // Three-way merge commit
          const nextHash = Math.random().toString(16).substring(2, 9);
          const mergeMsg = `Merge branch '${targetBranch}' into ${currentBranch}`;
          const newMergeCommit: Commit = {
            id: nextHash,
            message: mergeMsg,
            parents: [currentHeadHash, targetHeadHash],
            branch: currentBranch,
            x: 0,
            y: 0,
            color: '#fff',
            timestamp: new Date().toISOString(),
            author: 'ayushshukla1807'
          };

          const updatedCommits = [...commits, newMergeCommit];
          const updatedBranches = {
            ...branches,
            [currentBranch]: { ...branches[currentBranch], head: nextHash }
          };

          const finalCommits = recalculateCoordinates(updatedCommits, updatedBranches);
          setCommits(finalCommits);
          setBranches(updatedBranches);
          setHeadCommit(nextHash);
          
          addLog(`Merge made by the 'recursive' strategy.\nCreated merge commit ${nextHash.substring(0, 7)}.`, 'success');

          if (activeStep === 4 && targetBranch === 'feature/analytics') {
            advanceTutorial();
          }
          break;
        }

        case 'rebase': {
          const targetBranch = parts[1];
          if (!targetBranch || !branches[targetBranch]) {
            addLog(`Error: Specify a valid branch name to rebase onto.`, 'error');
            break;
          }

          if (targetBranch === currentBranch) {
            addLog('Already up to date.', 'output');
            break;
          }

          const targetHeadHash = branches[targetBranch].head;
          const currentHeadHash = branches[currentBranch].head;

          // Rebase: find commits on current branch that are NOT on target branch
          const ancestor = findCommonAncestor(currentHeadHash, targetHeadHash);
          if (!ancestor) {
            addLog('Error: Rebase failed (No common ancestor).', 'error');
            break;
          }

          // Find list of commits to cherry-pick
          const commitsToReapply: Commit[] = [];
          let current = currentHeadHash;
          while (current && current !== ancestor) {
            const cNode = commits.find(c => c.id === current);
            if (!cNode) break;
            // Avoid merge commits in simple rebase simulation
            if (cNode.parents.length <= 1) {
              commitsToReapply.unshift(cNode);
            }
            current = cNode.parents[0];
          }

          if (commitsToReapply.length === 0) {
            // Already up to date or fast-forward situation
            const updatedBranches = {
              ...branches,
              [currentBranch]: { ...branches[currentBranch], head: targetHeadHash }
            };
            setBranches(updatedBranches);
            setHeadCommit(targetHeadHash);
            const finalCommits = recalculateCoordinates(commits, updatedBranches);
            setCommits(finalCommits);
            addLog(`Fast-forwarded branch ${currentBranch} to head of ${targetBranch}.`, 'success');
            break;
          }

          // Reapply commits on top of targetHeadHash
          let newParent = targetHeadHash;
          const rebasedCommitsList = [...commits];
          const newMapping: Record<string, string> = {};

          for (const cNode of commitsToReapply) {
            const nextHash = Math.random().toString(16).substring(2, 9);
            const rebasedCommit: Commit = {
              id: nextHash,
              message: `${cNode.message} (rebased)`,
              parents: [newParent],
              branch: currentBranch,
              x: 0,
              y: 0,
              color: '#fff',
              timestamp: new Date().toISOString(),
              author: 'ayushshukla1807'
            };
            rebasedCommitsList.push(rebasedCommit);
            newMapping[cNode.id] = nextHash;
            newParent = nextHash;
          }

          // Update branch pointer
          const updatedBranches = {
            ...branches,
            [currentBranch]: { ...branches[currentBranch], head: newParent }
          };

          const finalCommits = recalculateCoordinates(rebasedCommitsList, updatedBranches);
          setCommits(finalCommits);
          setBranches(updatedBranches);
          setHeadCommit(newParent);
          
          addLog(`Successfully rebased and updated refs/heads/${currentBranch}.`, 'success');
          break;
        }

        case 'log': {
          let output = `* commit ${headCommit} (HEAD -> ${currentBranch})\n`;
          let current = headCommit;
          const visited = new Set<string>();

          while (current && !visited.has(current)) {
            visited.add(current);
            const cNode = commits.find(c => c.id === current);
            if (!cNode) break;
            
            const isHead = cNode.id === headCommit ? '' : `commit ${cNode.id}\n`;
            const branchRef = cNode.id === headCommit ? '' : ` (${cNode.branch})`;
            
            output += `${isHead}Author: ${cNode.author}\nDate:   ${cNode.timestamp}\n\n    ${cNode.message}\n\n`;
            
            // simple traversal following first parent
            current = cNode.parents[0];
          }
          addLog(output, 'output');
          break;
        }

        default:
          addLog(`Error: git command '${subCommand}' is not implemented in this workspace prototype.`, 'error');
      }
    } else {
      addLog(`Error: command '${trimmed}' not recognized. Type 'help' for command list.`, 'error');
    }
  };

  // Find common ancestor using commit tree BFS search
  const findCommonAncestor = (headA: string, headB: string): string | null => {
    const ancestorsA = new Set<string>();
    let queueA = [headA];
    
    while (queueA.length > 0) {
      const active = queueA.shift()!;
      if (active) {
        ancestorsA.add(active);
        const node = commits.find(c => c.id === active);
        if (node) {
          queueA.push(...node.parents);
        }
      }
    }

    let queueB = [headB];
    while (queueB.length > 0) {
      const active = queueB.shift()!;
      if (active) {
        if (ancestorsA.has(active)) {
          return active; // lowest common ancestor found
        }
        const node = commits.find(c => c.id === active);
        if (node) {
          queueB.push(...node.parents);
        }
      }
    }

    return null;
  };

  const advanceTutorial = () => {
    if (activeStep < TUTORIAL_STEPS.length - 1) {
      setActiveStep(prev => prev + 1);
      addLog(`[TUTORIAL] Step Completed! Proceeding to: ${TUTORIAL_STEPS[activeStep + 1].title}`, 'success');
    } else {
      addLog('[TUTORIAL] Congratulations! You have completed the Git Forge Branching & Merging Tutorial!', 'success');
    }
  };

  const triggerTutorialCommand = (cmd: string) => {
    executeGitCommand(cmd);
  };

  return (
    <div className="space-y-8 min-h-[75vh]">
      
      {/* Intro Dashboard Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Git Workspace Engine</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Interactive visual Git client. Directly operates commits, branches, merges, and rebases on a live DAG.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CLI Docs</span>
          </button>
          
          <button 
            onClick={resetRepository}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Repo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left column: SVG visualizer and Commit metadata details */}
        <div className="xl:col-span-2 space-y-8 flex flex-col">
          
          {/* Main Visualizer Canvas */}
          <div 
            ref={containerRef}
            className="relative flex-grow min-h-[480px] bg-black/40 rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-4 left-6 z-10 flex items-center gap-4">
              <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-[10px] font-mono border border-white/5 text-muted-foreground flex items-center gap-2">
                <span>Branch:</span>
                <span className="text-[#00f0ff] font-black font-sans">{currentBranch}</span>
              </span>
              <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-[10px] font-mono border border-white/5 text-muted-foreground flex items-center gap-2">
                <span>HEAD:</span>
                <span className="text-[#ff5733] font-black font-mono">{headCommit.substring(0, 7)}</span>
              </span>
            </div>

            {/* Canvas scale control */}
            <div className="absolute top-4 right-6 z-10 flex gap-2">
              <button 
                onClick={() => setVisualizationScale(prev => Math.max(0.7, prev - 0.1))} 
                className="w-7 h-7 bg-white/5 rounded-lg text-white font-bold flex items-center justify-center hover:bg-white/10 text-sm"
              >
                -
              </button>
              <button 
                onClick={() => setVisualizationScale(1)} 
                className="px-2 h-7 bg-white/5 rounded-lg text-white font-mono flex items-center justify-center hover:bg-white/10 text-[9px]"
              >
                {Math.round(visualizationScale * 100)}%
              </button>
              <button 
                onClick={() => setVisualizationScale(prev => Math.min(1.3, prev + 0.1))} 
                className="w-7 h-7 bg-white/5 rounded-lg text-white font-bold flex items-center justify-center hover:bg-white/10 text-sm"
              >
                +
              </button>
            </div>

            {/* SVG Render viewport */}
            <div className="w-full flex-grow overflow-auto relative p-6 mt-12">
              <svg 
                width="100%" 
                height="450" 
                style={{ transform: `scale(${visualizationScale})`, transformOrigin: 'top left' }}
                className="transition-transform duration-300"
              >
                <g>
                  {/* Draw parent-child Bezier connection curves */}
                  {commits.map(commit => {
                    return commit.parents.map(parentId => {
                      const parentNode = commits.find(c => c.id === parentId);
                      if (!parentNode) return null;
                      
                      // Draw smooth curve between parent and child coordinates
                      const startX = parentNode.x;
                      const startY = parentNode.y;
                      const endX = commit.x;
                      const endY = commit.y;

                      // Control point handles for standard Git branch flow curves
                      const cpY1 = startY - (startY - endY) * 0.4;
                      const cpY2 = endY + (startY - endY) * 0.4;

                      return (
                        <g key={`${commit.id}-${parentId}`}>
                          {/* Outer glow line */}
                          <path 
                            d={`M ${startX} ${startY} C ${startX} ${cpY1}, ${endX} ${cpY2}, ${endX} ${endY}`}
                            fill="none"
                            stroke={commit.color}
                            strokeWidth="4"
                            strokeOpacity="0.15"
                          />
                          {/* Inner line */}
                          <path 
                            d={`M ${startX} ${startY} C ${startX} ${cpY1}, ${endX} ${cpY2}, ${endX} ${endY}`}
                            fill="none"
                            stroke={commit.color}
                            strokeWidth="2"
                            strokeDasharray={commit.message.includes('(rebased)') ? '4,4' : undefined}
                          />
                        </g>
                      );
                    });
                  })}

                  {/* Draw commits nodes */}
                  {commits.map(commit => {
                    const isHead = commit.id === headCommit;
                    const isSelected = selectedCommit?.id === commit.id;

                    return (
                      <g 
                        key={commit.id} 
                        className="cursor-pointer group"
                        onClick={() => setSelectedCommit(commit)}
                      >
                        {/* Interactive glow ring */}
                        <circle 
                          cx={commit.x} 
                          cy={commit.y} 
                          r={isSelected ? 16 : isHead ? 14 : 10} 
                          fill="transparent" 
                          stroke={commit.color} 
                          strokeWidth="2"
                          strokeOpacity={isSelected || isHead ? 0.7 : 0.2}
                          className="group-hover:stroke-white transition-all duration-300"
                        />
                        {/* Outer node glow */}
                        {isHead && (
                          <circle 
                            cx={commit.x} 
                            cy={commit.y} 
                            r="12" 
                            fill={commit.color} 
                            fillOpacity="0.25"
                            className="animate-pulse"
                          />
                        )}
                        {/* Core commit point */}
                        <circle 
                          cx={commit.x} 
                          cy={commit.y} 
                          r={isHead ? 6 : 5} 
                          fill={commit.color} 
                          className="group-hover:fill-white transition-colors duration-300"
                        />
                        {/* Hash label text */}
                        <text 
                          x={commit.x + 16} 
                          y={commit.y + 4} 
                          fill="#888" 
                          fontSize="9" 
                          fontFamily="monospace"
                          className="opacity-60 group-hover:opacity-100 group-hover:fill-white font-bold transition-all"
                        >
                          {commit.id.substring(0, 7)}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* Quick Visual Shortcuts Panel */}
            <div className="border-t border-white/5 p-4 bg-white/[0.02] flex flex-wrap gap-3 items-center justify-between">
              <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">
                Quick Shortcuts:
              </span>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => triggerTutorialCommand('git add . && git commit -m "feat: patch hotfix index"')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                >
                  <GitCommit className="w-3 h-3" />
                  <span>Quick Commit</span>
                </button>

                <button 
                  onClick={() => {
                    const bName = `feature/dev-${Math.floor(Math.random() * 100)}`;
                    triggerTutorialCommand(`git checkout -b ${bName}`);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                >
                  <GitBranch className="w-3 h-3" />
                  <span>Create Branch</span>
                </button>

                <button 
                  onClick={() => {
                    const otherBranches = Object.keys(branches).filter(b => b !== currentBranch);
                    if (otherBranches.length > 0) {
                      triggerTutorialCommand(`git merge ${otherBranches[0]}`);
                    } else {
                      addLog('Error: Create and commit on a separate branch before merging.', 'error');
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                >
                  <GitMerge className="w-3 h-3" />
                  <span>Merge First Branch</span>
                </button>
              </div>
            </div>
          </div>

          {/* Commit Inspector Panel */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Commit Inspector & Graph refs</span>
            </h4>
            
            {selectedCommit ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-muted-foreground">HASH:</span>
                    <span className="text-white font-bold">{selectedCommit.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-muted-foreground">AUTHOR:</span>
                    <span className="text-[#00f0ff]">{selectedCommit.author}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-muted-foreground">DATE:</span>
                    <span className="text-white">{new Date(selectedCommit.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-muted-foreground">BRANCH:</span>
                    <span className="font-sans font-bold px-2 py-0.5 rounded text-[10px] text-black" style={{ backgroundColor: selectedCommit.color }}>
                      {selectedCommit.branch}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-muted-foreground">PARENTS:</span>
                    <span className="text-yellow-500">{selectedCommit.parents.join(', ') || 'None (Root)'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">MESSAGE:</span>
                    <span className="text-white font-sans font-bold italic">"{selectedCommit.message}"</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                Click any commit node in the SVG graph above to inspect metadata, parent linkage, authors, and branches.
              </p>
            )}
          </div>
        </div>

        {/* Right column: Tutorial guides & Interactive Console Shell */}
        <div className="space-y-8 flex flex-col justify-between">
          
          {/* Tutorial / Guided Mode */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#00f0ff]" />
                <span>Git Interactive Tutorial</span>
              </h4>
              <span className="text-[10px] font-bold text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded-full">
                Step {activeStep + 1} of {TUTORIAL_STEPS.length}
              </span>
            </div>

            <div className="space-y-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              <h5 className="text-sm font-black text-white">{TUTORIAL_STEPS[activeStep].title}</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {TUTORIAL_STEPS[activeStep].desc}
              </p>
              
              <div className="pt-2 flex items-center justify-between gap-4 border-t border-white/5">
                <code className="text-[10px] font-mono text-yellow-400 block bg-black/40 p-2 rounded-lg border border-white/5 flex-grow truncate">
                  {TUTORIAL_STEPS[activeStep].cmd}
                </code>
                
                <button 
                  onClick={() => triggerTutorialCommand(TUTORIAL_STEPS[activeStep].cmd)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#00f0ff] hover:bg-[#00f0ff]/80 text-black rounded-lg text-[9px] font-black uppercase tracking-wider transition-all shrink-0"
                >
                  <Play className="w-2.5 h-2.5 fill-black" />
                  <span>Run</span>
                </button>
              </div>
            </div>

            {/* Steps completion tracker */}
            <div className="flex gap-1.5 pt-1">
              {TUTORIAL_STEPS.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full flex-grow transition-all duration-300 ${
                    idx < activeStep 
                      ? 'bg-emerald-500' 
                      : idx === activeStep 
                      ? 'bg-[#00f0ff] w-4' 
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Shell Console */}
          <div className="glass p-6 rounded-3xl border border-white/5 flex-grow flex flex-col justify-between min-h-[380px] bg-black/60">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3 shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans">
                  Interactive Git Shell
                </span>
              </div>
              <span className="text-[9px] font-mono text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full">
                active-cli
              </span>
            </div>

            {/* Scrollable logs */}
            <div className="flex-grow overflow-y-auto space-y-3 font-mono text-[11px] pr-2 max-h-[320px] select-text">
              {terminalLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={`whitespace-pre-wrap leading-relaxed ${
                    log.type === 'cmd' 
                      ? 'text-yellow-400' 
                      : log.type === 'error' 
                      ? 'text-red-400 bg-red-950/20 p-2 rounded-lg border border-red-500/10' 
                      : log.type === 'success' 
                      ? 'text-emerald-400' 
                      : 'text-gray-300'
                  }`}
                >
                  {log.text}
                </div>
              ))}
              <div ref={consoleBottomRef} />
            </div>

            {/* CLI docs modal */}
            {showHelp && (
              <div className="bg-black/80 border border-white/10 p-4 rounded-2xl my-3 space-y-2 text-[10px] font-mono text-gray-400">
                <p className="text-white font-bold border-b border-white/5 pb-1">CLI Help Quick Ref:</p>
                <div>• <span className="text-yellow-400">git status</span>: show modified/staged files.</div>
                <div>• <span className="text-yellow-400">git add .</span>: stage all changes.</div>
                <div>• <span className="text-yellow-400">git commit -m "msg"</span>: create commit node.</div>
                <div>• <span className="text-yellow-400">git checkout -b [branch]</span>: branch & switch.</div>
                <div>• <span className="text-yellow-400">git checkout [branch]</span>: change HEAD focus.</div>
                <div>• <span className="text-yellow-400">git merge [branch]</span>: recursive merge branch.</div>
                <div>• <span className="text-yellow-400">git rebase [branch]</span>: rebase commits on top.</div>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="w-full text-center bg-white/5 hover:bg-white/10 py-1 rounded text-white text-[9px]"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Shell Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                executeGitCommand(cliInput);
              }}
              className="mt-4 border-t border-white/5 pt-3 flex items-center gap-2 shrink-0"
            >
              <span className="text-yellow-400 font-mono text-xs font-bold shrink-0">$</span>
              <input 
                type="text" 
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="git commit -m 'feat: ...'"
                className="bg-transparent text-white font-mono text-xs flex-grow outline-none border-none focus:ring-0 p-0"
              />
              <button 
                type="submit" 
                className="text-yellow-500 hover:text-white font-black text-[10px] uppercase tracking-widest shrink-0 transition-colors"
              >
                Execute
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
