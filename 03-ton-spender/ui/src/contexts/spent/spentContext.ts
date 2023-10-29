import { createContext } from 'react'

export type SpentContext = {
    userSpent: number
    spendHalf: () => void
    spendOne: () => void
}

export const spentContextInitialValue: SpentContext = {
    userSpent: 0,
    spendHalf: () => {},
    spendOne: () => {}
}

export const spentContext = createContext<SpentContext>(spentContextInitialValue)
