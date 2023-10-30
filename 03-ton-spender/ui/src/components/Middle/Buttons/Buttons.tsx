import { FC, useContext } from 'react'
import TonIcon from '../../TonIcon/TonIcon.tsx'
import { spendContext } from '../../../contexts/spent/spendContext.ts'
import styles from './Buttons.module.css'

type Props = {
    areDisabled: boolean
}

const Buttons: FC<Props> = ({ areDisabled }) => {
    const { addHalfToSpend, addOneToSpend } = useContext(spendContext)

    return (
        <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.button_sm}`} disabled={areDisabled} onClick={addHalfToSpend}>
                <TonIcon size={24} color={'var(--primary-color)'} />
                <div>0.5</div>
            </button>
            <button className={`${styles.button} ${styles.button_lg}`} disabled={areDisabled} onClick={addOneToSpend}>
                <TonIcon size={33} color={'var(--primary-color)'} />
                <div>1</div>
            </button>
        </div>
    )
}

export default Buttons
