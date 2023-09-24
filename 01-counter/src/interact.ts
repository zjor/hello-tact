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
        async inc(sender: Sender) {
            const seqno = await walletContract.getSeqno();
            await contract.send(sender, {value: toNano("0.01"), bounce: false}, "increment")
            await waitForTransaction(seqno, walletContract)
            console.log(`New value is: ${await contract.getCounter()}`)
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
        case 'inc':
            await counterClient.inc(sender)
            break
        default:
            throw Error(`Unsupported command: ${cmd}`)
    }
}

main().catch(console.log)
