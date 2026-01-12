export type ActionType = 'fold' | 'call' | 'raise' | 'raise_small' | 'raise_big' | 'all_in'

export type GridState = Record<string, ActionType>

export interface GTOScenario {
    id: string
    title: string
    description: string
    solution: GridState
}
