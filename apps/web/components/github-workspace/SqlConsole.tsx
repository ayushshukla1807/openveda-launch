'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Play, HelpCircle, Terminal, RefreshCw, Table, 
  ArrowRight, Activity, Code2, Layers, AlertCircle, FileText 
} from 'lucide-react';

interface SchemaTable {
  name: string;
  columns: Array<{ name: string; type: string; key?: 'PK' | 'FK'; ref?: string }>;
}

const DATABASE_SCHEMA: SchemaTable[] = [
  {
    name: 'organizations',
    columns: [
      { name: 'id', type: 'VARCHAR(50)', key: 'PK' },
      { name: 'name', type: 'VARCHAR(100)' },
      { name: 'program', type: 'VARCHAR(20)' },
      { name: 'language_focus', type: 'VARCHAR(50)' }
    ]
  },
  {
    name: 'repositories',
    columns: [
      { name: 'id', type: 'VARCHAR(50)', key: 'PK' },
      { name: 'org_id', type: 'VARCHAR(50)', key: 'FK', ref: 'organizations.id' },
      { name: 'name', type: 'VARCHAR(100)' },
      { name: 'stars', type: 'INT' },
      { name: 'forks', type: 'INT' },
      { name: 'open_issues', type: 'INT' }
    ]
  },
  {
    name: 'contributors',
    columns: [
      { name: 'id', type: 'VARCHAR(50)', key: 'PK' },
      { name: 'username', type: 'VARCHAR(50)' },
      { name: 'repo_id', type: 'VARCHAR(50)', key: 'FK', ref: 'repositories.id' },
      { name: 'commits', type: 'INT' },
      { name: 'role', type: 'VARCHAR(50)' }
    ]
  },
  {
    name: 'pull_requests',
    columns: [
      { name: 'id', type: 'VARCHAR(50)', key: 'PK' },
      { name: 'repo_id', type: 'VARCHAR(50)', key: 'FK', ref: 'repositories.id' },
      { name: 'title', type: 'VARCHAR(200)' },
      { name: 'state', type: 'VARCHAR(20)' },
      { name: 'additions', type: 'INT' },
      { name: 'deletions', type: 'INT' }
    ]
  }
];

// Mock In-memory database records
const TABLE_DATA: Record<string, any[]> = {
  organizations: [
    { id: 'org-1', name: 'Kubernetes', program: 'LFX 2027', language_focus: 'Go' },
    { id: 'org-2', name: 'CNCF', program: 'LFX 2027', language_focus: 'Go, Rust' },
    { id: 'org-3', name: 'Appsmith', program: 'GSoC 2027', language_focus: 'Java, TypeScript' },
    { id: 'org-4', name: 'GNOME', program: 'Outreachy', language_focus: 'C, Rust' },
    { id: 'org-5', name: 'Fedora', program: 'Outreachy', language_focus: 'Python, Ansible' }
  ],
  repositories: [
    { id: 'repo-1', org_id: 'org-1', name: 'kubernetes/kubernetes', stars: 104500, forks: 38200, open_issues: 2450 },
    { id: 'repo-2', org_id: 'org-2', name: 'prometheus/prometheus', stars: 52100, forks: 8400, open_issues: 940 },
    { id: 'repo-3', org_id: 'org-2', name: 'open-telemetry/opentelemetry-collector', stars: 12400, forks: 3100, open_issues: 420 },
    { id: 'repo-4', org_id: 'org-3', name: 'appsmithorg/appsmith', stars: 31200, forks: 4500, open_issues: 1350 },
    { id: 'repo-5', org_id: 'org-4', name: 'GNOME/gnome-shell', stars: 2400, forks: 920, open_issues: 180 }
  ],
  contributors: [
    { id: 'c-1', username: 'ayushshukla1807', repo_id: 'repo-1', commits: 42, role: 'Maintainer' },
    { id: 'c-2', username: 'Abhi3975', repo_id: 'repo-4', commits: 55, role: 'Contributor' },
    { id: 'c-3', username: 'liggitt', repo_id: 'repo-1', commits: 1450, role: 'Reviewer' },
    { id: 'c-4', username: 'brancz', repo_id: 'repo-2', commits: 320, role: 'Maintainer' },
    { id: 'c-5', username: 'sharat87', repo_id: 'repo-4', commits: 640, role: 'Maintainer' }
  ],
  pull_requests: [
    { id: 'pr-1', repo_id: 'repo-1', title: 'fix(kubelet): resolve heap leak allocation', state: 'merged', additions: 180, deletions: 12 },
    { id: 'pr-2', repo_id: 'repo-2', title: 'optimize: cache dynamic metrics keys', state: 'open', additions: 42, deletions: 5 },
    { id: 'pr-3', repo_id: 'repo-4', title: 'feat: add websocket telemetry sockets', state: 'merged', additions: 350, deletions: 80 },
    { id: 'pr-4', repo_id: 'repo-3', title: 'refactor: split collector config build', state: 'closed', additions: 120, deletions: 94 },
    { id: 'pr-5', repo_id: 'repo-1', title: 'fix: validate container namespaces rules', state: 'open', additions: 75, deletions: 8 }
  ]
};

const SQL_PRESETS = [
  {
    name: 'List All Repositories',
    query: 'SELECT name, stars, forks FROM repositories WHERE stars > 5000 ORDER BY stars DESC'
  },
  {
    name: 'Join Repositories & Organizations',
    query: 'SELECT r.name AS repo_name, r.stars, o.name AS org_name FROM repositories r JOIN organizations o ON r.org_id = o.id'
  },
  {
    name: 'Contributor Commits Leaderboard',
    query: 'SELECT username, commits, role FROM contributors ORDER BY commits DESC'
  },
  {
    name: 'Audit Pull Request Code Sizes',
    query: 'SELECT title, state, additions, deletions FROM pull_requests WHERE additions > 100'
  }
];

export default function SqlConsole() {
  const [sqlQuery, setSqlQuery] = useState(SQL_PRESETS[0].query);
  const [queryHistory, setQueryHistory] = useState<string[]>([
    'SELECT * FROM organizations',
    'SELECT * FROM repositories'
  ]);
  
  // Results view states
  const [resultsHeader, setResultsHeader] = useState<string[]>([]);
  const [resultsRows, setResultsRows] = useState<any[][]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [queryStats, setQueryStats] = useState<{ elapsed: number; rows: number } | null>(null);
  
  const [activeSubTab, setActiveSubTab] = useState<'results' | 'schema'>('results');
  
  const consoleLogEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Run initial query on load
    runQuery(SQL_PRESETS[0].query);
  }, []);

  const handleRunQuery = () => {
    runQuery(sqlQuery);
  };

  const runQuery = (rawQuery: string) => {
    const start = performance.now();
    setErrorMessage('');
    setResultsHeader([]);
    setResultsRows([]);
    setQueryStats(null);

    const query = rawQuery.trim().replace(/\s+/g, ' ');
    if (!query) {
      setErrorMessage('SQL compiler error: Empty query buffer.');
      return;
    }

    // Record query history
    if (!queryHistory.includes(rawQuery)) {
      setQueryHistory(prev => [rawQuery, ...prev.slice(0, 9)]);
    }

    try {
      // Basic SELECT parsing regex support:
      // SELECT [fields] FROM [table] [JOIN other ON condition] [WHERE condition] [ORDER BY field [DESC]] [LIMIT N]
      const selectMatch = query.match(/^SELECT\s+(.+?)\s+FROM\s+(\w+)(.*)$/i);
      
      if (!selectMatch) {
        throw new Error('MySQL Syntax Error: Only SELECT queries are supported in this workspace simulator sandbox.');
      }

      const fieldsStr = selectMatch[1].trim();
      const primaryTable = selectMatch[2].trim().toLowerCase();
      const remainingQuery = selectMatch[3].trim();

      if (!TABLE_DATA[primaryTable]) {
        throw new Error(`Table '${primaryTable}' does not exist in GSoC schema.`);
      }

      let activeDataset = [...TABLE_DATA[primaryTable]];

      // 1. Process JOIN if present
      // JOIN [table] ON [col1] = [col2]
      const joinMatch = remainingQuery.match(/JOIN\s+(\w+)\s+(?:(\w+)\s+)?ON\s+([\w.]+)\s*=\s*([\w.]+)/i);
      let isJoined = false;
      let joinTable = '';
      let joinAlias = '';
      let joinCol1 = '';
      let joinCol2 = '';

      if (joinMatch) {
        isJoined = true;
        joinTable = joinMatch[1].trim().toLowerCase();
        joinAlias = joinMatch[2] ? joinMatch[2].trim().toLowerCase() : '';
        joinCol1 = joinMatch[3].trim().toLowerCase();
        joinCol2 = joinMatch[4].trim().toLowerCase();

        if (!TABLE_DATA[joinTable]) {
          throw new Error(`Table '${joinTable}' joined not found in schemas.`);
        }

        // Perform join cross multiplication
        const joinedDataset: any[] = [];
        activeDataset.forEach(row => {
          TABLE_DATA[joinTable].forEach(jRow => {
            // Check condition
            // Example columns: r.org_id vs o.id
            const val1 = getRowValueByColumnRef(row, primaryTable, 'r', joinCol1);
            const val2 = getRowValueByColumnRef(jRow, joinTable, joinAlias || 'o', joinCol2);

            if (val1 !== null && val2 !== null && val1 === val2) {
              // Merge object keys with namespace prefixes or flat merge
              const combinedRow = { ...row };
              
              // Prefix parent table columns
              Object.keys(row).forEach(k => {
                combinedRow[`r.${k}`] = row[k];
              });

              // Prefix join table columns
              Object.keys(jRow).forEach(k => {
                combinedRow[`${joinAlias || 'o'}.${k}`] = jRow[k];
                combinedRow[`${joinTable}.${k}`] = jRow[k];
                // also flat key if not conflicting
                if (combinedRow[k] === undefined) {
                  combinedRow[k] = jRow[k];
                }
              });

              joinedDataset.push(combinedRow);
            }
          });
        });
        activeDataset = joinedDataset;
      }

      // 2. Process WHERE condition
      // WHERE [col] [= > <] [val]
      const whereMatch = remainingQuery.match(/WHERE\s+([\w.]+)\s*([<>=]+)\s*(['"]?[\w\s-]+['"]?)/i);
      if (whereMatch) {
        const fieldRef = whereMatch[1].trim();
        const operator = whereMatch[2].trim();
        const rawVal = whereMatch[3].trim().replace(/['"]/g, '');

        activeDataset = activeDataset.filter(row => {
          const rowVal = row[fieldRef] !== undefined ? row[fieldRef] : getFlatValue(row, fieldRef);
          if (rowVal === undefined) return false;

          const compareVal = isNaN(Number(rawVal)) ? rawVal : Number(rawVal);
          const targetVal = isNaN(Number(rowVal)) ? rowVal : Number(rowVal);

          if (operator === '=') return targetVal === compareVal;
          if (operator === '>') return targetVal > compareVal;
          if (operator === '<') return targetVal < compareVal;
          if (operator === '>=') return targetVal >= compareVal;
          if (operator === '<=') return targetVal <= compareVal;
          return false;
        });
      }

      // 3. Process ORDER BY
      // ORDER BY [col] [ASC/DESC]
      const orderMatch = remainingQuery.match(/ORDER BY\s+([\w.]+)(?:\s+(ASC|DESC))?/i);
      if (orderMatch) {
        const orderField = orderMatch[1].trim();
        const orderDirection = orderMatch[2] ? orderMatch[2].toUpperCase() : 'ASC';

        activeDataset.sort((a, b) => {
          const valA = a[orderField] !== undefined ? a[orderField] : getFlatValue(a, orderField);
          const valB = b[orderField] !== undefined ? b[orderField] : getFlatValue(b, orderField);

          if (valA === undefined || valB === undefined) return 0;
          if (valA < valB) return orderDirection === 'ASC' ? -1 : 1;
          if (valA > valB) return orderDirection === 'ASC' ? 1 : -1;
          return 0;
        });
      }

      // 4. Resolve Fields list and headers
      let headers: string[] = [];
      if (fieldsStr === '*') {
        // Collect all keys from dataset rows
        const keysSet = new Set<string>();
        activeDataset.forEach(row => {
          Object.keys(row).forEach(k => {
            if (!k.includes('.')) keysSet.add(k); // ignore helper prefixed columns
          });
        });
        headers = Array.from(keysSet);
      } else {
        headers = fieldsStr.split(',').map(f => {
          const asMatch = f.match(/(.+?)\s+AS\s+(.+)/i);
          return asMatch ? asMatch[2].trim() : f.trim();
        });
      }

      const rows = activeDataset.map(row => {
        if (fieldsStr === '*') {
          return headers.map(h => (row[h] !== undefined ? row[h] : 'NULL').toString());
        } else {
          return fieldsStr.split(',').map(f => {
            const asMatch = f.match(/(.+?)\s+AS\s+(.+)/i);
            const actualFieldRef = asMatch ? asMatch[1].trim() : f.trim();

            const rowVal = row[actualFieldRef] !== undefined ? row[actualFieldRef] : getFlatValue(row, actualFieldRef);
            return rowVal !== undefined && rowVal !== null ? rowVal.toString() : 'NULL';
          });
        }
      });

      setResultsHeader(headers);
      setResultsRows(rows);

      const end = performance.now();
      setQueryStats({
        elapsed: Math.round((end - start) * 100) / 100,
        rows: rows.length
      });
      setActiveSubTab('results');
    } catch (err: any) {
      setErrorMessage(err.message || 'Syntax compile error: Failed to parse SQL statement.');
    }
  };

  const getRowValueByColumnRef = (row: any, tableName: string, alias: string, colRef: string): any => {
    // colRef is like: r.org_id or org_id
    const colName = colRef.includes('.') ? colRef.split('.')[1] : colRef;
    const refAlias = colRef.includes('.') ? colRef.split('.')[0] : '';

    if (refAlias && refAlias !== alias && refAlias !== tableName) return null;
    return row[colName] !== undefined ? row[colName] : null;
  };

  const getFlatValue = (row: any, fieldRef: string): any => {
    // If fieldRef is like 'r.org_id' or 'org_id', resolve
    if (fieldRef.includes('.')) {
      const col = fieldRef.split('.')[1];
      if (row[fieldRef] !== undefined) return row[fieldRef];
      if (row[col] !== undefined) return row[col];
    }
    // Check aliases
    const aliases = ['r.', 'o.', 'c.', 'pr.'];
    for (const a of aliases) {
      if (row[`${a}${fieldRef}`] !== undefined) return row[`${a}${fieldRef}`];
    }
    return undefined;
  };

  return (
    <div className="space-y-8 min-h-[75vh]">
      
      {/* Visual Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping" />
            <h3 className="text-xl font-black text-white tracking-tight uppercase">MySQL Console (GSoC Schema)</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Execute SQL selection queries in real-time. Joins repositories, star levels, and contributor metrics.
          </p>
        </div>
        
        {/* Reset / Reload state button */}
        <button 
          onClick={() => runQuery(sqlQuery)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reload DB</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left column: Query Editor, Presets, and History */}
        <div className="xl:col-span-1 space-y-8">
          
          {/* Query Presets selection list */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>SQL Query Snippets</span>
            </h4>
            <div className="space-y-2.5">
              {SQL_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSqlQuery(preset.query);
                    runQuery(preset.query);
                  }}
                  className="w-full text-left p-3 bg-white/[0.01] hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-xl transition-all flex items-start gap-3 group"
                >
                  <Code2 className="w-4 h-4 text-gray-500 group-hover:text-primary pt-0.5 shrink-0 transition-colors" />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-white group-hover:text-primary transition-colors">{preset.name}</div>
                    <div className="text-[9px] text-gray-500 font-mono truncate pt-0.5">{preset.query}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Table history list */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-3">
            <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
              Query History
            </h5>
            <div className="space-y-1.5 font-mono text-[9px] text-gray-400 max-h-44 overflow-y-auto pr-1">
              {queryHistory.map((hist, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSqlQuery(hist);
                    runQuery(hist);
                  }}
                  className="w-full text-left truncate py-1.5 px-2 hover:bg-white/5 rounded hover:text-white transition-colors block border border-transparent hover:border-white/5"
                >
                  $ {hist}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Interactive editor and result spreadsheets */}
        <div className="xl:col-span-2 space-y-8 flex flex-col">
          
          {/* Query Editor console */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4 bg-black/40">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-yellow-500" />
                <span>SQL Input Console</span>
              </span>
              
              <button
                onClick={handleRunQuery}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-500 hover:bg-indigo-500/80 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Execute Query</span>
              </button>
            </div>

            <textarea 
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full h-32 bg-black/60 border border-white/5 rounded-2xl p-4 font-mono text-xs text-yellow-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 leading-relaxed select-text"
              placeholder="SELECT * FROM repositories WHERE stars > 1000"
            />
          </div>

          {/* Results grid / Schema tabs viewer */}
          <div className="glass rounded-3xl border border-white/5 flex-grow flex flex-col justify-between overflow-hidden">
            
            {/* View selectors */}
            <div className="border-b border-white/5 p-4 bg-white/[0.02] flex items-center justify-between flex-wrap gap-4 shrink-0">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveSubTab('results')}
                  className={`text-xs font-black uppercase tracking-widest pb-1 transition-all ${
                    activeSubTab === 'results' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Query Output
                </button>
                <button
                  onClick={() => setActiveSubTab('schema')}
                  className={`text-xs font-black uppercase tracking-widest pb-1 transition-all ${
                    activeSubTab === 'schema' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Schema diagram
                </button>
              </div>

              {queryStats && activeSubTab === 'results' && (
                <div className="text-[10px] font-mono text-gray-500 flex items-center gap-4">
                  <span>Fetched: <strong className="text-white">{queryStats.rows} rows</strong></span>
                  <span>Execution: <strong className="text-emerald-400">{queryStats.elapsed}ms</strong></span>
                </div>
              )}
            </div>

            {/* Sub-tab view contents */}
            <div className="flex-grow p-6 overflow-auto max-h-[380px]">
              {activeSubTab === 'results' ? (
                <div>
                  {/* Syntax compilation error alerts */}
                  {errorMessage ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-center gap-3 text-xs leading-relaxed">
                      <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  ) : resultsRows.length > 0 ? (
                    /* Data Table representation */
                    <table className="w-full text-left font-mono text-[11px] select-text">
                      <thead>
                        <tr className="border-b border-white/10 text-gray-400">
                          {resultsHeader.map((h, i) => (
                            <th key={i} className="pb-3 pr-4 font-bold uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {resultsRows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="py-2.5 pr-4 text-white">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground text-xs italic flex flex-col items-center gap-2">
                      <Table className="w-8 h-8 text-gray-600" />
                      <span>Execute a SELECT query to populate results dashboard rows.</span>
                    </div>
                  )}
                </div>
              ) : (
                /* Schema visualization */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
                  {DATABASE_SCHEMA.map((table, idx) => (
                    <div key={idx} className="bg-black/30 border border-white/5 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs font-black text-indigo-400 font-mono uppercase tracking-widest">{table.name}</span>
                        <Database className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      
                      <div className="space-y-1.5 font-mono text-[10px]">
                        {table.columns.map((col, colIdx) => (
                          <div key={colIdx} className="flex justify-between items-center text-gray-400">
                            <span className="flex items-center gap-1.5">
                              {col.key && (
                                <span className={`text-[8px] font-black px-1 rounded ${
                                  col.key === 'PK' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'
                                }`}>
                                  {col.key}
                                </span>
                              )}
                              <span className="text-white">{col.name}</span>
                            </span>
                            <span>{col.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
