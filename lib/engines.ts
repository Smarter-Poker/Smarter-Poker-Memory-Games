/**
 * 🧠 MEMORY MATRIX ENGINE INTEGRATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Connects Orb #5 to the XP, Diamond, and Bus systems.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { supabase } from './supabase'

// ═══════════════════════════════════════════════════════════
// ⚙️ CONFIGURATION (Mirrors TrainingRewardsService)
// ═══════════════════════════════════════════════════════════

export const TRAINING_CONFIG = {
    MIN_ACCURACY: 0.85,  // 85% threshold
    BASE_REWARD: 10,
    XP_PER_CORRECT: 15,
    XP_SPEED_BONUS: 5,
    STREAK_TIERS: {
        0: { multiplier: 1.00, label: 'No Streak', icon: '❄️' },
        1: { multiplier: 1.10, label: 'Warming Up', icon: '🌡️' },
        3: { multiplier: 1.20, label: 'Streak Tier 1', icon: '🔥' },
        7: { multiplier: 2.00, label: 'Streak Tier 2', icon: '🔥🔥' },
        14: { multiplier: 2.50, label: 'Streak Blazing', icon: '🔥🔥🔥' },
        30: { multiplier: 5.00, label: 'Monthly Master', icon: '👑' },
    }
}

// ═══════════════════════════════════════════════════════════
// 📡 XP EVENT BUS
// ═══════════════════════════════════════════════════════════

type XPEventType =
    | 'XP_EARNED'
    | 'XP_COMMITTED'
    | 'LEVEL_UP'
    | 'MASTERY_ACHIEVED'
    | 'STREAK_EXTENDED'
    | 'DIAMONDS_EARNED'
    | 'GTO_CORRECT'
    | 'GTO_INCORRECT'
    | 'LEAK_DETECTED'
    | 'RANGE_SUBMITTED'

interface XPEvent {
    type: XPEventType
    payload: Record<string, unknown>
    timestamp: number
    source: string
}

type EventHandler = (event: XPEvent) => void

class XPEventBusCore {
    private subscribers: Map<string, Set<EventHandler>> = new Map()
    private history: XPEvent[] = []

    emit(type: XPEventType, payload: Record<string, unknown>) {
        const event: XPEvent = {
            type,
            payload,
            timestamp: Date.now(),
            source: 'memory-matrix'
        }

        this.history.push(event)

        // Notify type-specific subscribers
        this.subscribers.get(type)?.forEach(handler => handler(event))

        // Notify wildcard subscribers
        this.subscribers.get('*')?.forEach(handler => handler(event))

        // Console log for debugging
        console.log(`📡 [XP_BUS] ${type}`, payload)
    }

    subscribe(type: XPEventType | '*', handler: EventHandler): () => void {
        if (!this.subscribers.has(type)) {
            this.subscribers.set(type, new Set())
        }
        this.subscribers.get(type)!.add(handler)

        // Return unsubscribe function
        return () => this.subscribers.get(type)?.delete(handler)
    }

    getHistory(): XPEvent[] {
        return [...this.history]
    }
}

export const XPEventBus = new XPEventBusCore()

// Convenience emitters
export const XPEvents = {
    gtoCorrect: (xpEarned: number, sessionId?: string) =>
        XPEventBus.emit('GTO_CORRECT', { xpEarned, sessionId }),

    gtoIncorrect: (hand: string, correctAction: string, userAction: string) =>
        XPEventBus.emit('GTO_INCORRECT', { hand, correctAction, userAction }),

    rangeSubmitted: (score: number, scenarioId: string) =>
        XPEventBus.emit('RANGE_SUBMITTED', { score, scenarioId }),

    diamondsEarned: (amount: number, source: string) =>
        XPEventBus.emit('DIAMONDS_EARNED', { amount, source }),

    levelUp: (newLevel: number, previousLevel: number) =>
        XPEventBus.emit('LEVEL_UP', { newLevel, previousLevel }),

    masteryAchieved: (scenarioId: string, score: number) =>
        XPEventBus.emit('MASTERY_ACHIEVED', { scenarioId, score }),
}

// ═══════════════════════════════════════════════════════════
// 💎 DIAMOND REWARD ENGINE
// ═══════════════════════════════════════════════════════════

export class DiamondRewardEngine {
    /**
     * Calculate and mint training rewards based on accuracy
     */
    static async mintTrainingReward(
        userId: string,
        accuracy: number,
        options: {
            sessionId?: string
            trainingType?: string
            scenarioId?: string
        } = {}
    ) {
        // Call Supabase RPC
        const { data, error } = await supabase.rpc('fn_mint_training_reward', {
            p_user_id: userId,
            p_accuracy: accuracy,
            p_base_reward: TRAINING_CONFIG.BASE_REWARD,
            p_session_id: options.sessionId || null,
            p_training_type: options.trainingType || 'MEMORY_MATRIX',
            p_metadata: { scenarioId: options.scenarioId }
        })

        if (error) {
            console.error('💎 Diamond mint failed:', error)
            return { success: false, error: error.message }
        }

        const result = typeof data === 'string' ? JSON.parse(data) : data

        if (result.success) {
            // Emit to bus
            XPEvents.diamondsEarned(result.reward?.total_reward || 0, 'memory_matrix')
        }

        return result
    }

    /**
     * Preview reward without minting
     */
    static previewReward(accuracy: number, streakDays: number = 0) {
        const passesThreshold = accuracy >= TRAINING_CONFIG.MIN_ACCURACY

        if (!passesThreshold) {
            return {
                eligible: false,
                accuracy: `${(accuracy * 100).toFixed(1)}%`,
                threshold: `${(TRAINING_CONFIG.MIN_ACCURACY * 100)}%`,
                message: `Need ${TRAINING_CONFIG.MIN_ACCURACY * 100}% accuracy to earn diamonds`,
                totalReward: 0
            }
        }

        // Get streak multiplier
        const tiers = Object.entries(TRAINING_CONFIG.STREAK_TIERS)
            .map(([days, info]) => ({ days: parseInt(days), ...info }))
            .sort((a, b) => b.days - a.days)

        const currentTier = tiers.find(t => streakDays >= t.days) || tiers[tiers.length - 1]

        // Calculate reward
        const baseReward = TRAINING_CONFIG.BASE_REWARD
        const accuracyBonus = Math.floor(baseReward * (accuracy - TRAINING_CONFIG.MIN_ACCURACY) * 10)
        const totalBeforeMultiplier = baseReward + accuracyBonus
        const totalReward = Math.floor(totalBeforeMultiplier * currentTier.multiplier)

        return {
            eligible: true,
            accuracy: `${(accuracy * 100).toFixed(1)}%`,
            baseReward,
            accuracyBonus,
            streakBonus: totalReward - totalBeforeMultiplier,
            totalReward,
            multiplier: currentTier.multiplier,
            tier: currentTier.label,
            tierIcon: currentTier.icon
        }
    }
}

// ═══════════════════════════════════════════════════════════
// ⚡ XP ENGINE
// ═══════════════════════════════════════════════════════════

export class XPEngine {
    private static LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 7500, 12000, 20000, 35000]

    /**
     * Award XP for correct answers
     */
    static async awardXP(userId: string, amount: number, source: string) {
        const { data, error } = await supabase.rpc('fn_award_xp', {
            p_user_id: userId,
            p_amount: amount,
            p_source: source
        })

        if (error) {
            console.error('⚡ XP award failed:', error)
            return { success: false, error: error.message }
        }

        XPEventBus.emit('XP_EARNED', { amount, source, userId })
        return data
    }

    /**
     * Calculate level from XP total
     */
    static calculateLevel(xpTotal: number): { level: number; progress: number; xpToNext: number } {
        let level = 1
        for (let i = 0; i < this.LEVEL_THRESHOLDS.length; i++) {
            if (xpTotal >= this.LEVEL_THRESHOLDS[i]) {
                level = i + 1
            } else {
                break
            }
        }

        const currentThreshold = this.LEVEL_THRESHOLDS[level - 1] || 0
        const nextThreshold = this.LEVEL_THRESHOLDS[level] || currentThreshold + 10000
        const xpInLevel = xpTotal - currentThreshold
        const xpNeeded = nextThreshold - currentThreshold
        const progress = xpInLevel / xpNeeded

        return {
            level,
            progress,
            xpToNext: xpNeeded - xpInLevel
        }
    }
}

// ═══════════════════════════════════════════════════════════
// 🎮 MEMORY MATRIX GAME ENGINE
// ═══════════════════════════════════════════════════════════

export class MemoryMatrixGameEngine {
    private userId: string | null = null
    private sessionId: string
    private startTime: number = 0
    private correctAnswers: number = 0
    private totalAnswers: number = 0

    constructor() {
        this.sessionId = `mm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    setUser(userId: string) {
        this.userId = userId
    }

    startSession() {
        this.startTime = Date.now()
        this.correctAnswers = 0
        this.totalAnswers = 0
        console.log('🎮 [MEMORY_MATRIX] Session started:', this.sessionId)
    }

    recordAnswer(isCorrect: boolean, hand?: string, action?: string) {
        this.totalAnswers++
        if (isCorrect) {
            this.correctAnswers++
            XPEvents.gtoCorrect(TRAINING_CONFIG.XP_PER_CORRECT, this.sessionId)
        } else if (hand && action) {
            XPEvents.gtoIncorrect(hand, 'correct_action', action)
        }
    }

    async submitSession(scenarioId: string, score: number) {
        const accuracy = score / 100
        const timeTaken = Date.now() - this.startTime

        XPEvents.rangeSubmitted(score, scenarioId)

        // Check mastery threshold
        if (accuracy >= TRAINING_CONFIG.MIN_ACCURACY) {
            XPEvents.masteryAchieved(scenarioId, score)
        }

        // Mint diamonds if user is logged in
        if (this.userId) {
            const reward = await DiamondRewardEngine.mintTrainingReward(
                this.userId,
                accuracy,
                { sessionId: this.sessionId, scenarioId }
            )
            return {
                ...reward,
                sessionId: this.sessionId,
                timeTaken
            }
        }

        // Preview only for anonymous users
        return {
            success: true,
            preview: DiamondRewardEngine.previewReward(accuracy, 0),
            sessionId: this.sessionId,
            timeTaken
        }
    }
}

// ═══════════════════════════════════════════════════════════
// 📤 SINGLETON EXPORT
// ═══════════════════════════════════════════════════════════

export const gameEngine = new MemoryMatrixGameEngine()
