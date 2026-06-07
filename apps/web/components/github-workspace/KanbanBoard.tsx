'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Check, Trash2, Tag, Calendar, AlertTriangle, 
  ArrowLeft, ArrowRight, ClipboardList, CheckSquare, Layers,
  ChevronLeft, ChevronRight, RefreshCw, BarChart2
} from 'lucide-react';

interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'peer_review' | 'merged';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  org: string;
  subtasks: SubTask[];
  updated_at: string;
}

const DEFAULT_TASKS: KanbanTask[] = [
  {
    id: 'task-1',
    title: 'Audit CNCF telemetry schema rules',
    description: 'Inspect open playbooks and identify memory bottleneck flags in the collector parser.',
    status: 'todo',
    priority: 'high',
    tags: ['Telemetry', 'Audit'],
    org: 'CNCF',
    subtasks: [
      { id: 'st-1', text: 'Clone eBPF metrics repo', completed: true },
      { id: 'st-2', text: 'Parse prometheus collector logs', completed: false },
      { id: 'st-3', text: 'Document leakage flags', completed: false }
    ],
    updated_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'task-2',
    title: 'Design vector embedding alignment',
    description: 'Structure custom similarity mapping calculations for the proposal optimizer.',
    status: 'in_progress',
    priority: 'medium',
    tags: ['GenAI', 'SQL'],
    org: 'Appsmith',
    subtasks: [
      { id: 'st-4', text: 'Define vector dimension width', completed: true },
      { id: 'st-5', text: 'Write cosine similarity query', completed: true },
      { id: 'st-6', text: 'Mock Supabase response data', completed: false }
    ],
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Implement eBPF connection pool logs',
    description: 'Log and intercept TCP connection requests using system-level kernel socket hooks.',
    status: 'peer_review',
    priority: 'high',
    tags: ['Systems', 'C'],
    org: 'Kubernetes',
    subtasks: [
      { id: 'st-7', text: 'Write C socket parser', completed: true },
      { id: 'st-8', text: 'Register ebpf hooks compiler', completed: true }
    ],
    updated_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'task-4',
    title: 'CI/CD pipeline test setup',
    description: 'Configure automated actions to build static Next.js pages and run pytest assertions.',
    status: 'merged',
    priority: 'low',
    tags: ['CI/CD', 'Git'],
    org: 'OpenVeda',
    subtasks: [
      { id: 'st-9', text: 'Draft build.yml configuration', completed: true },
      { id: 'st-10', text: 'Test compilation pipeline', completed: true }
    ],
    updated_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

const COLUMNS = [
  { id: 'todo', name: 'To Do', color: 'border-t-yellow-500/80 bg-yellow-500/5' },
  { id: 'in_progress', name: 'In Progress', color: 'border-t-sky-500/80 bg-sky-500/5' },
  { id: 'peer_review', name: 'Peer Review', color: 'border-t-purple-500/80 bg-purple-500/5' },
  { id: 'merged', name: 'Merged', color: 'border-t-emerald-500/80 bg-emerald-500/5' }
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<KanbanTask[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New task form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newOrg, setNewOrg] = useState('CNCF');
  const [newTagInput, setNewTagInput] = useState('');
  const [subtaskInputs, setSubtaskInputs] = useState<string[]>(['', '']);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      const currentUserStr = localStorage.getItem('openveda_user');
      const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
      const userId = currentUser ? currentUser.id : 'default';
      const stored = localStorage.getItem(`openveda_kanban_${userId}`);
      if (stored) {
        setTasks(JSON.parse(stored));
      } else {
        setTasks(DEFAULT_TASKS);
        localStorage.setItem(`openveda_kanban_${userId}`, JSON.stringify(DEFAULT_TASKS));
      }
    }
    setLoading(false);
  };

  const saveTasks = (updatedTasks: KanbanTask[]) => {
    setTasks(updatedTasks);
    if (typeof window !== 'undefined') {
      const currentUserStr = localStorage.getItem('openveda_user');
      const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
      const userId = currentUser ? currentUser.id : 'default';
      localStorage.setItem(`openveda_kanban_${userId}`, JSON.stringify(updatedTasks));
    }
  };

  const handleMoveCard = (taskId: string, direction: 'left' | 'right') => {
    const statusOrder: Array<KanbanTask['status']> = ['todo', 'in_progress', 'peer_review', 'merged'];
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const currentIdx = statusOrder.indexOf(task.status);
    let nextIdx = currentIdx;
    
    if (direction === 'left' && currentIdx > 0) nextIdx--;
    if (direction === 'right' && currentIdx < statusOrder.length - 1) nextIdx++;

    if (nextIdx !== currentIdx) {
      const updated = tasks.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            status: statusOrder[nextIdx],
            updated_at: new Date().toISOString()
          };
        }
        return t;
      });
      saveTasks(updated);
    }
  };

  const handleDeleteCard = (taskId: string) => {
    const updated = tasks.filter(t => t.id !== taskId);
    saveTasks(updated);
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const updatedSubtasks = t.subtasks.map(st => {
          if (st.id === subtaskId) {
            return { ...st, completed: !st.completed };
          }
          return st;
        });
        return {
          ...t,
          subtasks: updatedSubtasks,
          updated_at: new Date().toISOString()
        };
      }
      return t;
    });
    saveTasks(updated);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const parsedTags = newTagInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const parsedSubtasks: SubTask[] = subtaskInputs
      .filter(input => input.trim().length > 0)
      .map((text, idx) => ({
        id: `st-${Date.now()}-${idx}`,
        text: text.trim(),
        completed: false
      }));

    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim(),
      status: 'todo',
      priority: newPriority,
      tags: parsedTags.length > 0 ? parsedTags : ['Task'],
      org: newOrg,
      subtasks: parsedSubtasks,
      updated_at: new Date().toISOString()
    };

    const updated = [...tasks, newTask];
    saveTasks(updated);

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewPriority('medium');
    setNewOrg('CNCF');
    setNewTagInput('');
    setSubtaskInputs(['', '']);
    setShowAddForm(false);
  };

  const handleAddSubtaskField = () => {
    setSubtaskInputs(prev => [...prev, '']);
  };

  const handleSubtaskFieldChange = (idx: number, val: string) => {
    setSubtaskInputs(prev => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  // Telemetry statistics
  const getProgressStats = () => {
    const total = tasks.length;
    const merged = tasks.filter(t => t.status === 'merged').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress' || t.status === 'peer_review').length;
    const percent = total > 0 ? Math.round((merged / total) * 100) : 0;
    
    return { total, merged, inProgress, percent };
  };

  const stats = getProgressStats();

  return (
    <div className="space-y-8 min-h-[75vh]">
      
      {/* Visual Title Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 glass p-6 rounded-3xl border border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Contribution Workspace Board</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage your GSoC/LFX milestone preparation tasks. Isolated per user session.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Add task button */}
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/80 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task Card</span>
          </button>
        </div>
      </div>

      {/* Global telemetry progress bar */}
      <div className="glass p-5 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="flex items-center gap-3 text-xs md:col-span-1 border-r border-white/5 last:border-0 pr-4">
          <BarChart2 className="w-5 h-5 text-[#00f0ff]" />
          <div>
            <div className="font-bold text-white">Board Completion</div>
            <div className="text-[10px] text-muted-foreground">Stats generated in real-time</div>
          </div>
        </div>

        <div className="md:col-span-2 flex items-center gap-4 w-full">
          <span className="text-xs font-mono font-bold text-white shrink-0">{stats.percent}%</span>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.percent}%` }}
              className="h-full bg-gradient-to-r from-[#00f0ff] to-emerald-500 rounded-full"
            />
          </div>
        </div>

        <div className="md:col-span-1 text-[10px] font-mono text-gray-400 flex justify-end gap-6">
          <div>TOTAL: <strong className="text-white">{stats.total}</strong></div>
          <div>MERGED: <strong className="text-emerald-400">{stats.merged}</strong></div>
          <div>ACTIVE: <strong className="text-sky-400">{stats.inProgress}</strong></div>
        </div>
      </div>

      {/* Add Task dialog form overlay */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass p-6 rounded-3xl border border-white/5 space-y-4 overflow-hidden"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4 text-primary" />
                <span>Create New Task Card</span>
              </h4>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-[10px] font-bold text-red-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">Task Title</label>
                  <input 
                    type="text" 
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Write RAG embedding query"
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-white outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">Description</label>
                  <textarea 
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Enter short task specifications..."
                    className="w-full h-24 bg-black/40 border border-white/5 rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">Target Program/Org</label>
                    <select
                      value={newOrg}
                      onChange={(e) => setNewOrg(e.target.value)}
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 text-white outline-none focus:ring-1 focus:ring-primary/40"
                    >
                      <option value="CNCF">CNCF</option>
                      <option value="Kubernetes">Kubernetes</option>
                      <option value="Appsmith">Appsmith</option>
                      <option value="Prometheus">Prometheus</option>
                      <option value="OpenVeda">OpenVeda</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 text-white outline-none focus:ring-1 focus:ring-primary/40"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-gray-500 block">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="e.g. SQL, Dev, Bugfix"
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-white outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
              </div>

              {/* Subtask additions */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Subtasks Checklists</label>
                  <button
                    type="button"
                    onClick={handleAddSubtaskField}
                    className="text-[9px] font-black uppercase text-primary hover:text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {subtaskInputs.map((val, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={val}
                      onChange={(e) => handleSubtaskFieldChange(idx, e.target.value)}
                      placeholder={`Checklist item ${idx + 1}`}
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-white outline-none focus:ring-1 focus:ring-primary/40"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary/80 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  Confirm Card Addition
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Kanban grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          
          return (
            <div 
              key={col.id}
              className={`rounded-3xl border border-white/5 p-4 space-y-4 min-h-[500px] flex flex-col ${col.color}`}
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5 shrink-0">
                <span className="text-xs font-black text-white uppercase tracking-widest">{col.name}</span>
                <span className="text-[9px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-full font-bold">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="flex-grow space-y-4 overflow-y-auto max-h-[550px] pr-1">
                <AnimatePresence initial={false}>
                  {colTasks.map(task => {
                    const totalSub = task.subtasks.length;
                    const completedSub = task.subtasks.filter(st => st.completed).length;
                    const progressPercent = totalSub > 0 ? Math.round((completedSub / totalSub) * 100) : 0;
                    
                    return (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-black/50 border border-white/5 rounded-2xl p-4.5 space-y-4 hover:border-white/10 transition-all select-text"
                      >
                        {/* Task Card Header details */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-mono text-gray-400">
                            {task.org}
                          </span>

                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                            task.priority === 'high' 
                              ? 'bg-red-500/10 text-red-400' 
                              : task.priority === 'medium'
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : 'bg-gray-500/10 text-gray-400'
                          }`}>
                            {task.priority}
                          </span>
                        </div>

                        {/* Title & Desc */}
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-white leading-snug">{task.title}</h5>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">{task.description}</p>
                        </div>

                        {/* Subtasks checklists */}
                        {totalSub > 0 && (
                          <div className="space-y-2 pt-1">
                            <div className="flex justify-between items-center text-[8px] font-mono text-gray-500">
                              <span>CHECKLIST</span>
                              <span>{completedSub}/{totalSub}</span>
                            </div>
                            
                            {/* Checklist mini bar */}
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#00f0ff] rounded-full" 
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>

                            <div className="space-y-1.5 max-h-24 overflow-y-auto pt-1 select-none">
                              {task.subtasks.map(st => (
                                <div 
                                  key={st.id} 
                                  onClick={() => handleToggleSubtask(task.id, st.id)}
                                  className="flex items-start gap-2 cursor-pointer group"
                                >
                                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                                    st.completed 
                                      ? 'bg-[#00f0ff] border-[#00f0ff] text-black' 
                                      : 'border-white/10 group-hover:border-[#00f0ff]/40 bg-white/[0.01]'
                                  }`}>
                                    {st.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                  </div>
                                  <span className={`text-[9px] leading-tight transition-all ${
                                    st.completed ? 'line-through text-gray-500' : 'text-gray-300 group-hover:text-white'
                                  }`}>
                                    {st.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {task.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-mono text-gray-400 flex items-center gap-1">
                              <Tag className="w-2 h-2 text-gray-500" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>

                        {/* Controller buttons */}
                        <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                          <button 
                            onClick={() => handleDeleteCard(task.id)}
                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                            title="Delete card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-1.5 select-none">
                            {task.status !== 'todo' && (
                              <button 
                                onClick={() => handleMoveCard(task.id, 'left')}
                                className="w-6 h-6 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 text-white transition-all"
                                title="Move Left"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>
                            )}
                            
                            {task.status !== 'merged' && (
                              <button 
                                onClick={() => handleMoveCard(task.id, 'right')}
                                className="w-6 h-6 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 text-white transition-all"
                                title="Move Right"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                
                {colTasks.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground text-[10px] italic flex-grow flex flex-col justify-center items-center gap-2">
                    <ClipboardList className="w-8 h-8 text-neutral-800" />
                    <span>No cards in column.</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
