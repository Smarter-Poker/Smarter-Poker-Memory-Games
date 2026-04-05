/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GTO SOLUTIONS — PioSolver-Derived Preflop Ranges for Preflop Charts
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * All ranges derived from PioSolver GTO data (solverRanges.js).
 * Mixed-frequency hands are resolved to their PRIMARY action:
 *   - RFI spots: raise >= 30% frequency → 'raise', else fold (omitted)
 *   - 3-Bet spots: raise >= 30% → 'raise', else fold
 *   - Defense spots: call >= 30% → 'call', raise >= 30% → 'raise'
 *
 * Hands not listed in a GridState default to 'fold'.
 *
 * Source: Smarter-Poker-World-Hub/src/config/solverRanges.js
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { GridState, GTOScenario } from './types'

// ═══════════════════════════════════════════════════════════════════════════
// RFI — RAISE FIRST IN (6-max, 100BB)
// ═══════════════════════════════════════════════════════════════════════════

const UTG_RFI_100BB: GridState = {
    // ~15.5% range — tightest position
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise',
    'A5s': 'raise', 'A4s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise',
    'QJs': 'raise', 'JTs': 'raise',
    'T9s': 'raise', '98s': 'raise',
    'KQo': 'raise',
}

const MP_RFI_100BB: GridState = {
    // ~19% range
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise',
    'A5s': 'raise', 'A4s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise',
    'QJs': 'raise', 'QTs': 'raise',
    'JTs': 'raise',
    'T9s': 'raise', '98s': 'raise', '87s': 'raise',
    '76s': 'raise', '65s': 'raise',
    'KQo': 'raise',
}

const HJ_RFI_100BB: GridState = {
    // ~22% range
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise', 'A8s': 'raise',
    'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise',
    'JTs': 'raise', 'J9s': 'raise',
    'T9s': 'raise', '98s': 'raise', '87s': 'raise',
    '76s': 'raise', '65s': 'raise', '54s': 'raise',
    'KQo': 'raise', 'KJo': 'raise',
}

const CO_RFI_100BB: GridState = {
    // ~27% range
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise', '55': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise', 'A8s': 'raise',
    'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise', 'A2s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise',
    'JTs': 'raise', 'J9s': 'raise',
    'T9s': 'raise', 'T8s': 'raise', '98s': 'raise',
    '87s': 'raise', '76s': 'raise', '65s': 'raise', '54s': 'raise',
    'KQo': 'raise', 'KJo': 'raise', 'KTo': 'raise',
    'QJo': 'raise', 'JTo': 'raise',
}

const BTN_RFI_100BB: GridState = {
    // ~48% range — widest open position
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise', '55': 'raise',
    '44': 'raise', '33': 'raise', '22': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise',
    'A8s': 'raise', 'A7s': 'raise', 'A6s': 'raise', 'A5s': 'raise', 'A4s': 'raise',
    'A3s': 'raise', 'A2s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise', 'A9o': 'raise', 'A8o': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise', 'K8s': 'raise',
    'K7s': 'raise', 'K6s': 'raise',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise', 'Q8s': 'raise',
    'JTs': 'raise', 'J9s': 'raise', 'J8s': 'raise',
    'T9s': 'raise', 'T8s': 'raise',
    '98s': 'raise', '97s': 'raise', '87s': 'raise', '86s': 'raise',
    '76s': 'raise', '65s': 'raise', '54s': 'raise', '43s': 'raise',
    'KQo': 'raise', 'KJo': 'raise', 'KTo': 'raise', 'K9o': 'raise',
    'QJo': 'raise', 'QTo': 'raise', 'Q9o': 'raise',
    'JTo': 'raise', 'J9o': 'raise', 'T9o': 'raise', '98o': 'raise',
}

const SB_RFI_100BB: GridState = {
    // ~42% SB open-raise (raise or fold, no limp in GTO)
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise', '55': 'raise',
    '44': 'raise', '33': 'raise', '22': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise',
    'A8s': 'raise', 'A7s': 'raise', 'A6s': 'raise', 'A5s': 'raise', 'A4s': 'raise',
    'A3s': 'raise', 'A2s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise', 'A9o': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise', 'K8s': 'raise',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise',
    'JTs': 'raise', 'J9s': 'raise',
    'T9s': 'raise', 'T8s': 'raise', '98s': 'raise',
    '87s': 'raise', '76s': 'raise', '65s': 'raise', '54s': 'raise',
    'KQo': 'raise', 'KJo': 'raise', 'KTo': 'raise',
    'QJo': 'raise', 'QTo': 'raise', 'JTo': 'raise',
    'T9o': 'raise',
}

// ═══════════════════════════════════════════════════════════════════════════
// 3-BET RANGES — Position vs Opener
// ═══════════════════════════════════════════════════════════════════════════

const BTN_3BET_VS_UTG: GridState = {
    // BTN 3-bet vs UTG open — tight value + blocker bluffs
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise',
    'JJ': 'raise', 'AKs': 'raise', 'AQs': 'raise',
    'AJs': 'raise', 'A5s': 'raise', 'A4s': 'raise',
    'AKo': 'raise', 'AQo': 'raise',
    'KQs': 'raise',
    // Calls (flatting IP)
    'TT': 'call', '99': 'call', '88': 'call', '77': 'call',
    'ATs': 'call', 'A9s': 'call',
    'AJo': 'call',
    'KJs': 'call', 'KTs': 'call',
    'QJs': 'call', 'QTs': 'call',
    'JTs': 'call', 'T9s': 'call',
    '98s': 'call', '87s': 'call',
}

const BTN_3BET_VS_CO: GridState = {
    // BTN 3-bet vs CO — wider since CO opens wider
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise',
    'JJ': 'raise', 'TT': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise',
    'A5s': 'raise', 'A4s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise',
    'KQs': 'raise', 'KJs': 'raise',
    'QJs': 'raise',
    // Calls
    '99': 'call', '88': 'call', '77': 'call', '66': 'call',
    'A9s': 'call', 'A8s': 'call',
    'ATo': 'call',
    'KTs': 'call', 'K9s': 'call',
    'QTs': 'call',
    'JTs': 'call', 'J9s': 'call',
    'T9s': 'call', 'T8s': 'call',
    '98s': 'call', '87s': 'call', '76s': 'call',
    'KQo': 'call',
}

const SB_3BET_VS_BTN: GridState = {
    // SB 3-bet vs BTN open — polarized (3-bet or fold, rarely flat OOP)
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise',
    'JJ': 'raise', 'TT': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise',
    'A9s': 'raise', 'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise',
    'QJs': 'raise', 'QTs': 'raise',
    'JTs': 'raise',
    'T9s': 'raise', '98s': 'raise',
    'KQo': 'raise',
    '87s': 'raise', '76s': 'raise',
}

const BB_3BET_VS_BTN: GridState = {
    // BB 3-bet vs BTN — wide value + bluffs since BTN opens wide
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise',
    'JJ': 'raise', 'TT': 'raise', '99': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise',
    'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise',
    'KQs': 'raise', 'KJs': 'raise',
    'QJs': 'raise',
}

const BB_3BET_VS_SB: GridState = {
    // BB 3-bet vs SB limp/raise — widest 3-bet since heads up
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise',
    'JJ': 'raise', 'TT': 'raise', '99': 'raise', '88': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise',
    'A8s': 'raise', 'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise', 'A2s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise',
    'JTs': 'raise', 'J9s': 'raise',
    'T9s': 'raise', '98s': 'raise',
    '87s': 'raise', '76s': 'raise', '65s': 'raise',
    'KQo': 'raise', 'KJo': 'raise',
}

// ═══════════════════════════════════════════════════════════════════════════
// BB DEFENSE — Facing opens from various positions
// ═══════════════════════════════════════════════════════════════════════════

const BB_DEFENSE_VS_UTG: GridState = {
    // BB vs UTG open — tight defense, mostly calls
    'QQ': 'call', 'JJ': 'call', 'TT': 'call', '99': 'call', '88': 'call',
    '77': 'call', '66': 'call',
    'AQs': 'call', 'AJs': 'call', 'ATs': 'call', 'A9s': 'call',
    'A5s': 'call', 'A4s': 'call',
    'AQo': 'call',
    'KQs': 'call', 'KJs': 'call', 'KTs': 'call',
    'QJs': 'call', 'QTs': 'call',
    'JTs': 'call', 'J9s': 'call',
    'T9s': 'call', '98s': 'call', '87s': 'call',
    '76s': 'call', '65s': 'call', '54s': 'call',
    // 3-bet for value
    'AA': 'raise', 'KK': 'raise',
    'AKs': 'raise', 'AKo': 'raise',
}

const BB_DEFENSE_VS_CO: GridState = {
    // BB vs CO open — wider defense
    'JJ': 'call', 'TT': 'call', '99': 'call', '88': 'call',
    '77': 'call', '66': 'call', '55': 'call',
    'AQs': 'call', 'AJs': 'call', 'ATs': 'call', 'A9s': 'call', 'A8s': 'call',
    'A5s': 'call', 'A4s': 'call', 'A3s': 'call',
    'AQo': 'call', 'AJo': 'call',
    'KQs': 'call', 'KJs': 'call', 'KTs': 'call', 'K9s': 'call',
    'QJs': 'call', 'QTs': 'call', 'Q9s': 'call',
    'JTs': 'call', 'J9s': 'call',
    'T9s': 'call', 'T8s': 'call',
    '98s': 'call', '97s': 'call', '87s': 'call', '86s': 'call',
    '76s': 'call', '75s': 'call', '65s': 'call', '54s': 'call',
    'KQo': 'call',
    // 3-bet
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise',
    'AKs': 'raise', 'AKo': 'raise',
    'A2s': 'raise',
}

const BB_DEFENSE_VS_BTN: GridState = {
    // BB vs BTN open — widest defense (best pot odds)
    'TT': 'call', '99': 'call', '88': 'call', '77': 'call',
    '66': 'call', '55': 'call', '44': 'call', '33': 'call', '22': 'call',
    'AJs': 'call', 'ATs': 'call', 'A9s': 'call', 'A8s': 'call', 'A7s': 'call',
    'A6s': 'call', 'A5s': 'call', 'A4s': 'call', 'A3s': 'call', 'A2s': 'call',
    'ATo': 'call', 'A9o': 'call', 'A8o': 'call',
    'KQs': 'call', 'KJs': 'call', 'KTs': 'call', 'K9s': 'call', 'K8s': 'call',
    'K7s': 'call', 'K6s': 'call',
    'QJs': 'call', 'QTs': 'call', 'Q9s': 'call', 'Q8s': 'call',
    'JTs': 'call', 'J9s': 'call', 'J8s': 'call',
    'T9s': 'call', 'T8s': 'call', 'T7s': 'call',
    '98s': 'call', '97s': 'call', '87s': 'call', '86s': 'call',
    '76s': 'call', '75s': 'call', '65s': 'call', '64s': 'call',
    '54s': 'call', '53s': 'call', '43s': 'call',
    'KQo': 'call', 'KJo': 'call', 'KTo': 'call',
    'QJo': 'call', 'QTo': 'call', 'JTo': 'call',
    // 3-bet
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise',
    'AKs': 'raise', 'AQs': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise',
}

const BB_DEFENSE_VS_SB: GridState = {
    // BB vs SB open — widest defense (heads up, closing action)
    '99': 'call', '88': 'call', '77': 'call', '66': 'call',
    '55': 'call', '44': 'call', '33': 'call', '22': 'call',
    'ATs': 'call', 'A9s': 'call', 'A8s': 'call', 'A7s': 'call',
    'A6s': 'call', 'A5s': 'call', 'A4s': 'call', 'A3s': 'call',
    'ATo': 'call', 'A9o': 'call', 'A8o': 'call', 'A7o': 'call',
    'KJs': 'call', 'KTs': 'call', 'K9s': 'call', 'K8s': 'call',
    'K7s': 'call', 'K6s': 'call', 'K5s': 'call',
    'QJs': 'call', 'QTs': 'call', 'Q9s': 'call', 'Q8s': 'call', 'Q7s': 'call',
    'JTs': 'call', 'J9s': 'call', 'J8s': 'call',
    'T9s': 'call', 'T8s': 'call', 'T7s': 'call',
    '98s': 'call', '97s': 'call', '96s': 'call',
    '87s': 'call', '86s': 'call', '85s': 'call',
    '76s': 'call', '75s': 'call', '65s': 'call', '64s': 'call',
    '54s': 'call', '53s': 'call', '43s': 'call',
    'KQo': 'call', 'KJo': 'call', 'KTo': 'call', 'K9o': 'call',
    'QJo': 'call', 'QTo': 'call', 'Q9o': 'call',
    'JTo': 'call', 'J9o': 'call', 'T9o': 'call',
    '98o': 'call', '87o': 'call',
    // 3-bet
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise',
    'A2s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise',
    'KQs': 'raise',
}

// ═══════════════════════════════════════════════════════════════════════════
// SCENARIO EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export const SCENARIOS: GTOScenario[] = [
    // ─── RFI (Raise First In) ──────────────────────────────────────────
    {
        id: 'utg-rfi-100bb',
        title: 'UTG RFI (100bb)',
        description: 'Under the Gun opening range. The tightest position — only premium hands.',
        solution: UTG_RFI_100BB,
    },
    {
        id: 'mp-rfi-100bb',
        title: 'MP RFI (100bb)',
        description: 'Middle Position opening range. Slightly wider than UTG.',
        solution: MP_RFI_100BB,
    },
    {
        id: 'hj-rfi-100bb',
        title: 'HJ RFI (100bb)',
        description: 'Hijack opening range. Widest early position — transition to late position.',
        solution: HJ_RFI_100BB,
    },
    {
        id: 'co-rfi-100bb',
        title: 'CO RFI (100bb)',
        description: 'Cutoff opening range. Wide open with position advantage.',
        solution: CO_RFI_100BB,
    },
    {
        id: 'btn-rfi-100bb',
        title: 'BTN RFI (100bb)',
        description: 'Button opening range. Widest open — best position at the table.',
        solution: BTN_RFI_100BB,
    },
    {
        id: 'sb-rfi-100bb',
        title: 'SB RFI (100bb)',
        description: 'Small Blind opening range. Raise or fold — no limping in GTO.',
        solution: SB_RFI_100BB,
    },

    // ─── 3-Bet Ranges ──────────────────────────────────────────────────
    {
        id: 'btn-3bet-vs-utg',
        title: 'BTN 3-Bet vs UTG',
        description: 'Button 3-bet range facing UTG open. Tight value + blocker bluffs.',
        solution: BTN_3BET_VS_UTG,
    },
    {
        id: 'btn-3bet-vs-co',
        title: 'BTN 3-Bet vs CO',
        description: 'Button 3-bet range facing CO open. Wider since CO opens wider.',
        solution: BTN_3BET_VS_CO,
    },
    {
        id: 'sb-3bet-vs-btn',
        title: 'SB 3-Bet vs BTN',
        description: 'SB 3-bet vs BTN open. Polarized — 3-bet or fold, rarely flat OOP.',
        solution: SB_3BET_VS_BTN,
    },
    {
        id: 'bb-3bet-vs-btn',
        title: 'BB 3-Bet vs BTN',
        description: 'BB 3-bet range vs BTN open. Wide value + bluffs since BTN opens wide.',
        solution: BB_3BET_VS_BTN,
    },
    {
        id: 'bb-3bet-vs-sb',
        title: 'BB 3-Bet vs SB',
        description: 'BB 3-bet vs SB open. Widest 3-bet range — heads up with position.',
        solution: BB_3BET_VS_SB,
    },

    // ─── BB Defense ────────────────────────────────────────────────────
    {
        id: 'bb-defense-vs-utg',
        title: 'BB Defense vs UTG',
        description: 'Big Blind defense facing UTG open. Tight — respect the strong range.',
        solution: BB_DEFENSE_VS_UTG,
    },
    {
        id: 'bb-defense-vs-co',
        title: 'BB Defense vs CO',
        description: 'Big Blind defense facing CO open. Wider defense — CO range is weaker.',
        solution: BB_DEFENSE_VS_CO,
    },
    {
        id: 'bb-defense-vs-btn',
        title: 'BB Defense vs BTN',
        description: 'Big Blind defense facing BTN open. Widest defense — best pot odds.',
        solution: BB_DEFENSE_VS_BTN,
    },
    {
        id: 'bb-defense-vs-sb',
        title: 'BB Defense vs SB',
        description: 'Big Blind defense facing SB open. Very wide — heads up, closing action.',
        solution: BB_DEFENSE_VS_SB,
    },
]
