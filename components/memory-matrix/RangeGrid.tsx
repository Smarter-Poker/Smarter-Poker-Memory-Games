import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ActionType, GridState } from '../../lib/types'

// --- Utility for Tailwind ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// --- Constants ---
const HAND_MATRIX = [
    ['AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'],
    ['AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s'],
    ['AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s'],
    ['AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s'],
    ['ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s'],
    ['A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99', '98s', '97s', '96s', '95s', '94s', '93s', '92s'],
    ['A8o', 'K8o', 'Q8o', 'J8o', 'T8o', '98o', '88', '87s', '86s', '85s', '84s', '83s', '82s'],
    ['A7o', 'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '77', '76s', '75s', '74s', '73s', '72s'],
    ['A6o', 'K6o', 'Q6o', 'J6o', 'T6o', '96o', '86o', '76o', '66', '65s', '64s', '63s', '62s'],
    ['A5o', 'K5o', 'Q5o', 'J5o', 'T5o', '95o', '85o', '75o', '65o', '55', '54s', '53s', '52s'],
    ['A4o', 'K4o', 'Q4o', 'J4o', 'T4o', '94o', '84o', '74o', '64o', '54o', '44', '43s', '42s'],
    ['A3o', 'K3o', 'Q3o', 'J3o', 'T3o', '93o', '83o', '73o', '63o', '53o', '43o', '33', '32s'],
    ['A2o', 'K2o', 'Q2o', 'J2o', 'T2o', '92o', '82o', '72o', '62o', '52o', '42o', '32o', '22'],
]

const ACTION_COLORS: Record<ActionType, string> = {
    fold: 'bg-zinc-800',
    call: 'bg-emerald-500',
    raise: 'bg-red-500',
    raise_small: 'bg-orange-400',
    raise_big: 'bg-red-600',
    all_in: 'bg-purple-600',
}

interface RangeGridProps {
    mode?: 'paint' | 'view' | 'feedback'
    onCellClick?: (hand: string, currentAction: ActionType) => void
    gridState: GridState
    feedbackMask?: {
        missed: string[]
        extra: string[]
        wrongAction: string[]
    }
}

export default function RangeGrid({
    mode = 'paint',
    gridState,
    onCellClick,
    feedbackMask
}: RangeGridProps) {

    const [isMouseDown, setIsMouseDown] = useState(false)
    const [activePaintAction, setActivePaintAction] = useState<ActionType>('raise')

    // Handle cell interaction
    const handleInteraction = (hand: string) => {
        if (mode === 'view' || mode === 'feedback') return
        if (onCellClick) {
            onCellClick(hand, activePaintAction)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Controls (Only in Paint Mode) */}
            {mode === 'paint' && (
                <div className="flex gap-2 p-2 bg-zinc-900 rounded-lg border border-zinc-800 w-fit mx-auto shadow-lg">
                    {(Object.keys(ACTION_COLORS) as ActionType[]).map((action) => (
                        <button
                            key={action}
                            onClick={() => setActivePaintAction(action)}
                            className={cn(
                                "px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all",
                                activePaintAction === action
                                    ? "ring-2 ring-white scale-105"
                                    : "opacity-50 hover:opacity-80",
                                ACTION_COLORS[action]
                            )}
                        >
                            {action.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            )}

            {/* The 13x13 GRID */}
            <div
                className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-[2px] bg-black p-1 rounded-lg border border-zinc-800 shadow-2xl select-none mx-auto relative group"
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => setIsMouseDown(false)}
                onMouseLeave={() => setIsMouseDown(false)}
                style={{ width: '100%', maxWidth: '800px', aspectRatio: '1/1' }}
            >
                {HAND_MATRIX.flat().map((hand) => {
                    const action = gridState[hand] || 'fold'

                    // Feedback Logic
                    const isMissed = feedbackMask?.missed.includes(hand)
                    const isExtra = feedbackMask?.extra.includes(hand)
                    const isWrongAction = feedbackMask?.wrongAction.includes(hand)
                    const isError = isMissed || isExtra || isWrongAction

                    return (
                        <motion.div
                            key={hand}
                            onMouseDown={() => handleInteraction(hand)}
                            onMouseEnter={() => {
                                if (isMouseDown && mode === 'paint') {
                                    handleInteraction(hand)
                                }
                            }}
                            initial={{ scale: 1 }}
                            whileHover={mode === 'paint' ? { scale: 1.1, zIndex: 10 } : {}}
                            whileTap={mode === 'paint' ? { scale: 0.9 } : {}}
                            className={cn(
                                "flex items-center justify-center text-[10px] sm:text-xs font-medium cursor-pointer transition-colors duration-75 relative",
                                ACTION_COLORS[action],
                                action === 'fold' ? 'text-zinc-500' : 'text-white',
                                "rounded-[2px]",

                                // --- Feedback Styles ---
                                isMissed && "ring-2 ring-blue-500 z-20", // Should have painted, didn't
                                isExtra && "ring-2 ring-red-500 z-20 opacity-50", // Painted, shouldn't have
                                isWrongAction && "ring-2 ring-yellow-400 z-20", // Wrong color

                                // Dim non-errors in feedback mode for focus
                                (mode === 'feedback' && !isError) && "opacity-30 grayscale"
                            )}
                        >
                            {hand}
                            {/* Error Marker Icon */}
                            {isError && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-[8px] font-black text-white bg-black/50 px-0.5 rounded">
                                        {isMissed ? '!' : 'X'}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
