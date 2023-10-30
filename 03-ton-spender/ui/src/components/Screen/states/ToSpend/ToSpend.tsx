import { FC, useContext } from 'react'
import TonIcon from '../../../TonIcon/TonIcon.tsx'
import { spendContext } from '../../../../contexts/spent/spendContext.ts'
import styles from './ToSpend.module.css'

const ToSpend: FC = () => {
    const { toSpend } = useContext(spendContext)

    return (
        <div className={styles.totalSpent}>
            <h5 className={styles.totalSpent__title}>Spend:</h5>
            <div className={styles.totalSpent__number}>{toSpend}</div>
            <div className={styles.totalSpent__footer}>
                <TonIcon size={20} />
                <p className={styles.footer__text}>
                    TON’<span>s</span>
                </p>
            </div>
        </div>
    )
}

export default ToSpend
