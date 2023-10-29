import { FC, PropsWithChildren } from 'react'
import styles from './Ticket.module.css'

type Props = {
    background: string
}

const Ticket: FC<PropsWithChildren<Props>> = ({ children, background }) => {
    return (
        <div className={styles.ticket} style={{ background }}>
            {children}
        </div>
    )
}

export default Ticket
