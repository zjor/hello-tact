import { FC } from 'react'
import TonIcon from '../TonIcon/TonIcon'
import styles from './CurrentWallet.module.css'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { useMinTonAddress } from '../../hooks/useMinTonAddress.ts'

const CurrentWallet: FC = () => {
    const [tonConnectUI] = useTonConnectUI()
    const minimizedCurrentWalletAddress = useMinTonAddress()

    const handleClick = async () => {
        await tonConnectUI.disconnect()
    }

    return (
        <div className={styles.currentWallet}>
            <TonIcon color={'var(--brand-color)'} />
            <p className={styles.currentWallet__text}>{minimizedCurrentWalletAddress}</p>
            <button className={styles.currentWallet__disconnect} onClick={handleClick}>
                Disconnect
            </button>
        </div>
    )
}

export default CurrentWallet
