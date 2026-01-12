import { GridState, GTOScenario } from './types'

// Helper to generate a full 13x13 grid where everything is 'fold' by default
function createEmptyGrid(): GridState {
    // In a real app we'd map all 169 combos. 
    // For this mock, we assume undefined = fold.
    return {}
}

const UTG_OPEN_100BB: GridState = {
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise', '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise', '55': 'raise', '44': 'raise',
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise', 'A8s': 'raise', 'A7s': 'raise', 'A6s': 'raise', 'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise', 'A2s': 'raise',
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise',
    'KQo': 'raise', 'KJo': 'raise',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise',
    'QJo': 'raise',
    'JTs': 'raise', 'J9s': 'raise',
    'T9s': 'raise', '87s': 'raise', '76s': 'raise', '65s': 'raise', '54s': 'raise'
}

const BUTTON_VS_OPEN_CALL: GridState = {
    // Condensed range example
    'JJ': 'call', 'TT': 'call', '99': 'call', '88': 'call', '77': 'call', '66': 'call', '55': 'call', '44': 'call', '33': 'call', '22': 'call',
    'AQs': 'call', 'AJs': 'call', 'ATs': 'call', 'A9s': 'call', 'A8s': 'call', 'A5s': 'call', 'A4s': 'call', 'A3s': 'call', 'A2s': 'call',
    'KQs': 'call', 'KJs': 'call', 'KTs': 'call', 'QJs': 'call', 'QTs': 'call', 'JTs': 'call', 'T9s': 'call', '98s': 'call',
    'AQo': 'call', 'KQo': 'call'
}

export const SCENARIOS: GTOScenario[] = [
    {
        id: 'utg-open-100bb',
        title: 'UTG RFI (100bb)',
        description: 'Select the standard Opening Range from Under the Gun.',
        solution: UTG_OPEN_100BB
    },
    {
        id: 'btn-vs-open-flat',
        title: 'BTN vs UTG Open (Flat Range)',
        description: 'Which hands do we just CALL with on the Button vs an EP Open?',
        solution: BUTTON_VS_OPEN_CALL
    }
]
