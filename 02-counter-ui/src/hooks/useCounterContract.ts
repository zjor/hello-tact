import {useEffect, useState} from 'react';
import {Counter} from '../contracts/counter_Counter';
import {useTonClient} from './useTonClient';
import {useAsyncInitialize} from './useAsyncInitialize';
import {Address, OpenedContract, toNano} from 'ton-core';
import {useTonConnect} from "./useTonConnect";

export function useCounterContract() {
    const client = useTonClient();
    const [val, setVal] = useState<null | number>();
    const {sender} = useTonConnect();

    const counterContract = useAsyncInitialize(async () => {
        if (!client) {
            return
        }
        const contractAddress = Address.parse('EQDyIQNaImSQNAg_AX-kXUi5N1kM12L2w-wwbqAfa_p74k3W')
        const contract = Counter.fromAddress(contractAddress)
        return client.open(contract) as OpenedContract<Counter>;
    }, [client]);

    async function getValue() {
        if (!counterContract) {
            return
        }
        setVal(null);
        const val = await counterContract.getCounter();
        setVal(Number(val));
    }

    useEffect(() => {
        getValue().catch(console.log);
    }, [counterContract]);

    return {
        value: val,
        address: counterContract?.address.toString(),
        sendIncrement: async () => {
            await counterContract?.send(sender, {value: toNano('0.005'), bounce: false}, 'increment')
        },
    };
}
