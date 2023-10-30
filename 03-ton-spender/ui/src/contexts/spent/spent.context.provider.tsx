import { FC, PropsWithChildren, useState } from 'react'
import { spendContext, SpendContext } from './spendContext.ts'
import { useSpenderContract } from '../../hooks/useSpenderContract.ts'

const SpentContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [toSpend, setToSpend] = useState(0)
    const { spend } = useSpenderContract()

    const addOneToSpend = () => setToSpend(toSpend => toSpend + 1)
    const addHalfToSpend = () => setToSpend(toSpend => toSpend + 0.5)

    const spendAction = () => {
        spend(toSpend.toString()).then(() => {
            setToSpend(0)
        })
    }

    const value: SpendContext = {
        addOneToSpend,
        addHalfToSpend,
        toSpend: toSpend,
        spend: spendAction
    }

    return <spendContext.Provider value={value}>{children}</spendContext.Provider>
}

export default SpentContextProvider
