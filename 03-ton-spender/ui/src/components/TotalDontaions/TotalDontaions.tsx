import { FC } from 'react'
import styles from './TotalDontaions.module.css'
import TonIcon from '../TonIcon/TonIcon.tsx'
import { useSpenderContract } from '../../hooks/useSpenderContract.ts'
import { fromNano } from 'ton'

const TotalDontaions: FC = () => {
    const { total } = useSpenderContract()
    const numberOfDonations = total ? +fromNano(total) : 0

    return (
        <div className={styles.totalDontaions}>
            <div className={styles.totalDontaions__top}>
                <h5 className={styles.totalDontaions__number}>{numberOfDonations}</h5>
                <div className={styles.totalDontaions__tonIcon}>
                    <TonIcon color={'var(--primary-color)'} />
                </div>
            </div>
            <h4 className={styles.totalDontaions__title}>total donations</h4>
        </div>
    )
}

export default TotalDontaions
