import { FC } from 'react'
import Ticket from '../Ticket/Ticket.tsx'
import Ticketer from '../Ticketer/Ticketer.tsx'
import ConnectWalletButton from '../ConnectWalletButton/ConnectWalletButton.tsx'
import CurrentWallet from '../CurrentWallet/CurrentWallet.tsx'
import Description from './Description/Description.tsx'
import TotalDontaions from '../TotalDontaions/TotalDontaions.tsx'
import { useTonStatus } from '../../hooks/useTonStatus.ts'
import styles from './Footer.module.css'

const Footer: FC = () => {
    const isConnected = useTonStatus()

    const ticketBackground = isConnected ? 'white' : 'var(--brand-color)'

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Ticketer>
                    <Ticket background={ticketBackground}>
                        {isConnected ? <CurrentWallet /> : <ConnectWalletButton />}
                    </Ticket>
                </Ticketer>

                <div className={styles.footer_bottom}>
                    <TotalDontaions />
                    <Description />
                </div>
            </div>
        </footer>
    )
}

export default Footer
