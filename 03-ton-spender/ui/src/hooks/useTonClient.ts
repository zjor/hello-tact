import {getHttpEndpoint} from '@orbs-network/ton-access';
import {TonClient} from 'ton';
import {useAsyncInitialize} from './useAsyncInitialize';

export function useTonClient(isMainNet: boolean = true) {
    return useAsyncInitialize(
        async () =>
            new TonClient({
                endpoint: await getHttpEndpoint({network: isMainNet ? 'mainnet' : 'testnet'}),
            })
    );
}
