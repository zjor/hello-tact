import {getTonClient, loadWallet, waitForTransaction} from "./ton-utils";
import {Address, Sender, toNano} from "ton-core";
import {Counter} from "./output/counter_Counter";
import {OpenedContract, WalletContractV4} from "ton";

const CounterClient = (contract: OpenedContract<Counter>, walletContract: OpenedContract<WalletContractV4>) => {
    return {
        async getCounter() {
            const value = await contract.getCounter()
            console.log(`Counter value: ${value}`)
        },
        // async setCounter(sender: Sender, value: number) {
        //     const seqno = await walletContract.getSeqno();
        //     const message: SetValue = {
        //         $$type: 'SetValue',
        //         value: BigInt(value)
        //     }
        //     await contract.send(sender, {value: toNano("0.005"), bounce: false}, message)
        //     await waitForTransaction(seqno, walletContract)
        // },
        async inc(sender: Sender) {
            const seqno = await walletContract.getSeqno();
            await contract.send(sender, {value: toNano("0.01"), bounce: false}, "inc")
            await waitForTransaction(seqno, walletContract)
        }
    }
}

async function main() {
    const args = process.argv.slice(2)
    if (args.length < 2) {
        console.log(`
Usage: pnpm run play <contractAddress> <command> [arg]
Commands are
    - get
    - set <value>
    - inc
`)
    }
    const [address, cmd, arg] = args

    const client = await getTonClient()
    const {contract: walletContract, sender} = await loadWallet(client)
    const contract = client.open(Counter.fromAddress(Address.parse(address)))
    const counterClient = CounterClient(contract, walletContract)

    switch (cmd) {
        case 'get':
            await counterClient.getCounter()
            break
        // case 'set':
        //     await counterClient.setCounter(sender, parseInt(arg))
        //     break
        case 'inc':
            await counterClient.inc(sender)
            break
    }
}

main().catch(console.log)
