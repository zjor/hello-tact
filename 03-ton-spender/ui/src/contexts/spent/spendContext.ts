import { createContext } from 'react'

export type SpendContext = {
    toSpend: number
    addOneToSpend: () => void
    addHalfToSpend: () => void
    spend: () => void
}

export const spendContextInitialValue: SpendContext = {
    toSpend: 0,
    addOneToSpend: () => {},
    addHalfToSpend: () => {},
    spend: () => {}
}

export const spendContext = createContext<SpendContext>(spendContextInitialValue)
