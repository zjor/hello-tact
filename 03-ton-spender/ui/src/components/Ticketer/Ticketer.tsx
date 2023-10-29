import { FC, PropsWithChildren } from 'react'
import styles from './Ticketer.module.css'

const Ticketer: FC<PropsWithChildren> = ({
    // Max height must be less or equal to 54 pixels
    children
}) => {
    return (
        <div className={styles.ticketer}>
            <div className={styles.ticketer__content}>{children}</div>
        </div>
    )
}

export default Ticketer
