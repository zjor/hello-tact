import { FC, useContext } from 'react'
import { spendContext } from '../../contexts/spent/spendContext.ts'
import styles from './SpendButton.module.css'
import { useTonStatus } from '../../hooks/useTonStatus.ts'

const SpendButton: FC = () => {
    const isConnected = useTonStatus()
    const { spend, toSpend } = useContext(spendContext)

    return (
        <div className={styles.spendButton__wrapper}>
            <button onClick={spend} disabled={!isConnected || toSpend == 0} className={styles.spendButton}>
                Spend
            </button>
        </div>
    )
}

export default SpendButton
