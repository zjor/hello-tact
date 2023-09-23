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
        const contractAddress = Address.parse('EQDjeQwlD91BrsuqSgx_JS_Z6OkJ6Bko6sszenIhdx2F7qIa')
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
            await counterContract?.send(sender, {value: toNano('0.01'), bounce: false}, 'inc')
        },
    };
}
