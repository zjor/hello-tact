import { FC, MouseEventHandler } from 'react'
import TonIcon from '../TonIcon/TonIcon.tsx'
import { useTonConnectUI } from '@tonconnect/ui-react'
import styles from './ConnectWalletButton.module.css'

const ConnectWalletButton: FC = () => {
    const [tonConnectUI] = useTonConnectUI()

    const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
        await tonConnectUI.connectWallet()
    }

    return (
        <button onClick={handleClick} className={styles.connectWalletButton}>
            <TonIcon />
            <p className={styles.connectWalletButton__text}>Connect Wallet</p>
        </button>
    )
}

export default ConnectWalletButton
