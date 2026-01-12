'use client'

import React, { useState } from 'react'
import RangeGrid from '../../components/memory-matrix/RangeGrid'
import { SCENARIOS } from '../../lib/gto-solutions'
import { gradeUserGrid, GradeResult } from '../../lib/grading-engine'
import { GridState, ActionType } from '../../lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

export default function MemoryMatrixPage() {
    // --- Game State ---
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
    const [userGrid, setUserGrid] = useState<GridState>({})
    const [gradeResult, setGradeResult] = useState<GradeResult | null>(null)

    const scenario = SCENARIOS[currentScenarioIndex]

    const handleCellClick = (hand: string, action: ActionType) => {
        // If graded, reset to paint mode if they click (optional UX choice)
        if (gradeResult) setGradeResult(null)

        setUserGrid(prev => ({
            ...prev,
            [hand]: action
        }))
    }

    const handleSubmit = () => {
        const result = gradeUserGrid(userGrid, scenario.solution)
        setGradeResult(result)
    }

    const handleNextLevel = () => {
        const nextIndex = (currentScenarioIndex + 1) % SCENARIOS.length
        setCurrentScenarioIndex(nextIndex)
        setUserGrid({})
        setGradeResult(null)
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-orange-500/30">
            <header className="mb-8 text-center">
                <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 animate-pulse">
                    MEMORY MATRIX
                </h1>
                <p className="text-zinc-500 mt-2 font-mono uppercase tracking-[0.2em] text-xs">
                    Orb #5 // Neural Link Established
                </p>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

                {/* LEFT COLUMN: THE GRID */}
                <section className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-sm">
                    {/* Header Bar */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                {scenario.title}
                                {gradeResult && (
                                    <span className={clsx(
                                        "text-xs px-2 py-1 rounded font-black uppercase tracking-wider",
                                        gradeResult.score >= 90 ? "bg-green-500 text-black" : "bg-red-500 text-black"
                                    )}>
                                        {gradeResult.score >= 90 ? 'PASSED' : 'FAILED'}
                                    </span>
                                )}
                            </h2>
                            <p className="text-zinc-400 text-sm mt-1">{scenario.description}</p>
                        </div>

                        {/* Score Display (Only when graded) */}
                        <AnimatePresence>
                            {gradeResult && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-end"
                                >
                                    <span className="text-sm text-zinc-500 uppercase tracking-widest font-mono">Accuracy</span>
                                    <span className={clsx(
                                        "text-5xl font-black tracking-tighter",
                                        gradeResult.score === 100 ? "text-purple-400" :
                                            gradeResult.score > 80 ? "text-green-400" : "text-red-500"
                                    )}>
                                        {gradeResult.score}%
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* The Game Board */}
                    <RangeGrid
                        mode={gradeResult ? 'feedback' : 'paint'}
                        gridState={userGrid}
                        onCellClick={handleCellClick}
                        feedbackMask={gradeResult ? {
                            missed: gradeResult.missedHands,
                            extra: gradeResult.extraHands,
                            wrongAction: gradeResult.wrongActionHands
                        } : undefined}
                    />

                    {/* Action Bar */}
                    <div className="mt-8 flex justify-center gap-4">
                        {!gradeResult ? (
                            <button
                                onClick={handleSubmit}
                                className="px-12 py-4 bg-white text-black font-black text-xl rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                SUBMIT RANGE
                            </button>
                        ) : (
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setGradeResult(null)} // Retry
                                    className="px-8 py-3 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors"
                                >
                                    RETRY
                                </button>
                                <button
                                    onClick={handleNextLevel}
                                    className="px-8 py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                                >
                                    NEXT LEVEL &rarr;
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* RIGHT COLUMN: STATS & INFO */}
                <aside className="space-y-6">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <h3 className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-4">Feedback Protocol</h3>

                        {gradeResult ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-zinc-950 rounded border-l-4 border-green-500">
                                    <span className="text-sm text-zinc-300">Correct</span>
                                    <span className="font-mono text-green-400 font-bold">{gradeResult.correctHands}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-zinc-950 rounded border-l-4 border-blue-500">
                                    <span className="text-sm text-zinc-300">Missed</span>
                                    <span className="font-mono text-blue-400 font-bold">{gradeResult.missedHands.length}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-zinc-950 rounded border-l-4 border-red-500">
                                    <span className="text-sm text-zinc-300">Extra (Bad)</span>
                                    <span className="font-mono text-red-400 font-bold">{gradeResult.extraHands.length}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-10 text-zinc-600">
                                <p>Complete the range grid to initialize analysis.</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <h3 className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-4">Drill Sequence</h3>
                        <ul className="space-y-2">
                            {SCENARIOS.map((s, idx) => (
                                <li
                                    key={s.id}
                                    className={clsx(
                                        "flex items-center gap-3 p-3 rounded cursor-pointer transition-colors",
                                        idx === currentScenarioIndex ? "bg-zinc-800 border border-zinc-700" : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                    onClick={() => {
                                        setCurrentScenarioIndex(idx)
                                        setUserGrid({})
                                        setGradeResult(null)
                                    }}
                                >
                                    <span className={clsx(
                                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                                        idx === currentScenarioIndex ? "bg-orange-500 text-black" : "bg-zinc-800 text-zinc-500"
                                    )}>
                                        {idx + 1}
                                    </span>
                                    <span className="text-sm font-medium">{s.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

            </div>
        </div>
    )
}
