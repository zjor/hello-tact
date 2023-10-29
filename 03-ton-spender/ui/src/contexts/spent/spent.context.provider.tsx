import { FC, PropsWithChildren, useState } from 'react'
import { spentContext } from './spentContext.ts'

const SpentContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [userSpent, setUserSpent] = useState(0)

    const spendHalf = () => setUserSpent(userSpent => userSpent + 0.5)
    const spendOne = () => setUserSpent(userSpent => userSpent + 1)

    const value: spentContext = { userSpent, spendHalf, spendOne }

    return <spentContext.Provider value={value}>{children}</spentContext.Provider>
}

export default SpentContextProvider
