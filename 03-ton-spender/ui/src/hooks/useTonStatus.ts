import { useState } from 'react'
import { useTonConnectUI } from '@tonconnect/ui-react'

export const useTonStatus = () => {
    const [tonConnectUI] = useTonConnectUI()
    const [isConnected, setIsConnected] = useState(false)

    tonConnectUI.onStatusChange(() => {
        setIsConnected(tonConnectUI.connected)
    })

    return isConnected
}
