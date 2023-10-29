import { FC, useContext } from 'react'
import Screen from '../Screen/Screen.tsx'
import Buttons from './Buttons/Buttons.tsx'
import { useTonStatus } from '../../hooks/useTonStatus.ts'
import { spentContext } from '../../contexts/spent/spentContext.ts'
import styles from './Middle.module.css'

const Middle: FC = () => {
    const { userSpent } = useContext(spentContext)
    const isConnected = useTonStatus()

    const state = !isConnected ? 0 : userSpent === 0 ? 1 : 2

    const areButtonsDisabled = !isConnected

    return (
        <div className={styles.middle}>
            <Screen state={state} />
            <Buttons areDisabled={areButtonsDisabled} />
        </div>
    )
}

export default Middle
