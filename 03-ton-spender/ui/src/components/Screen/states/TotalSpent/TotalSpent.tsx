import { FC, useContext } from 'react'
import TonIcon from '../../../TonIcon/TonIcon.tsx'
import { spentContext } from '../../../../contexts/spent/spentContext.ts'
import styles from './TotalSpent.module.css'

const TotalSpent: FC = () => {
    const { userSpent } = useContext(spentContext)

    return (
        <div className={styles.totalSpent}>
            <h5 className={styles.totalSpent__title}>Spent:</h5>
            <div className={styles.totalSpent__number}>{userSpent}</div>
            <div className={styles.totalSpent__footer}>
                <TonIcon size={20} />
                <p className={styles.footer__text}>
                    TON’<span>s</span>
                </p>
            </div>
        </div>
    )
}

export default TotalSpent
