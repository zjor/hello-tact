import { useTonAddress } from '@tonconnect/ui-react'

export const useMinTonAddress = () => {
    const tonAddress = useTonAddress()
    const split = tonAddress.split('')
    const first4Letters = split.slice(0, 4).join('')
    const last4Letters = split.slice(split.length - 5, split.length - 1).join('')

    return `${first4Letters}...${last4Letters}`
}
