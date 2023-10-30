import { useEffect, useState } from 'react'
import { Spender } from '../contracts/spender_Spender'
import { useTonClient } from './useTonClient'
import { useAsyncInitialize } from './useAsyncInitialize'
import { Address, OpenedContract, toNano } from 'ton-core'
import { useTonConnect } from './useTonConnect'

export const useSpenderContract = () => {
    const client = useTonClient()
    const [total, setTotal] = useState<null | number>(null)
    const [available, setAvailable] = useState<null | number>(null)
    const { sender } = useTonConnect()

    const spenderContract = useAsyncInitialize(async () => {
        if (!client) return

        const contractAddress = Address.parse(import.meta.env.VITE_CONTRACT_ADDRESS)
        const contract = Spender.fromAddress(contractAddress)

        return client.open(contract) as OpenedContract<Spender>
    }, [client])

    async function getTotal() {
        if (!spenderContract) return

        setTotal(null)

        const val = await spenderContract.getTotal()
        setTotal(Number(val))
    }

    async function getAvailable() {
        if (!spenderContract) {
            return
        }
        setAvailable(null)
        const val = await spenderContract.getAvailable()
        setAvailable(Number(val))
    }

    async function spend(amount: string) {
        if (!spenderContract) {
            return
        }
        await spenderContract.send(sender, { value: toNano(amount), bounce: false }, null)
    }

    useEffect(() => {
        getTotal().catch(console.log)
        getAvailable().catch(console.log)

        setInterval(() => {
            getTotal().catch(console.log)
        }, 10000)
    }, [spenderContract])

    return {
        total,
        available,
        spend,
        address: spenderContract?.address.toString()
    }
}
