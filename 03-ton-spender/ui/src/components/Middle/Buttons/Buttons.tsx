import { FC, useContext } from 'react'
import TonIcon from '../../TonIcon/TonIcon.tsx'
import { useSpenderContract } from '../../../hooks/useSpenderContract.ts'
import { spentContext } from '../../../contexts/spent/spentContext.ts'
import styles from './Buttons.module.css'

type Props = {
    areDisabled: boolean
}

const Buttons: FC<Props> = ({ areDisabled }) => {
    const { spend } = useSpenderContract()
    const { spendOne, spendHalf } = useContext(spentContext)

    const spendHalfHandler = () => spend('0.5').then(spendHalf)
    const spendOneHandler = () => spend('1.0').then(spendOne)

    return (
        <div className={styles.buttons}>
            <button
                className={`${styles.button} ${styles.button_sm}`}
                disabled={areDisabled}
                onClick={spendHalfHandler}
            >
                <TonIcon size={24} color={'var(--primary-color)'} />
                <div>0.5</div>
            </button>
            <button className={`${styles.button} ${styles.button_lg}`} disabled={areDisabled} onClick={spendOneHandler}>
                <TonIcon size={33} color={'var(--primary-color)'} />
                <div>1</div>
            </button>
        </div>
    )
}

export default Buttons
