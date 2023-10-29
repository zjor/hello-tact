import { getHttpEndpoint } from '@orbs-network/ton-access'
import { useAsyncInitialize } from './useAsyncInitialize'
import { TonClient } from 'ton'

export const useTonClient = (isMainNet = true) => {
    return useAsyncInitialize(
        async () =>
            new TonClient({
                endpoint: await getHttpEndpoint({ network: isMainNet ? 'mainnet' : 'testnet' })
            })
    )
}
