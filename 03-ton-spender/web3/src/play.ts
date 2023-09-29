// TODO: get total transferred
// TODO: get available balance
// TODO: pay
// TODO: withdraw


import {getTonClient, loadWallet, waitForTransaction} from "./ton-utils";
import {Address, Sender, toNano} from "ton-core";
import { Spender } from "../src/output/spender_Spender"
import {OpenedContract, WalletContractV4} from "ton";

const ContractClient = (contract: OpenedContract<Spender>, walletContract: OpenedContract<WalletContractV4>) => {
    return {
        async getTotal() {
            console.log(`getTotal(): ${await contract.getTotal()}`)
        },
        async getAvailable() {
            console.log(`getAvailable(): ${await contract.getAvailable()}`)
        },
        async pay(sender: Sender, amount: string) {
            const seqno = await walletContract.getSeqno();
            await contract.send(sender, {value: toNano(amount), bounce: false}, null)
            await waitForTransaction(seqno, walletContract)
            console.log(`\ttotal: ${await contract.getTotal()}`)
            console.log(`\tavailable: ${await contract.getAvailable()}`)
        },
        async withdraw(sender: Sender, amount: string) {
            const seqno = await walletContract.getSeqno();
            await contract.send(sender, {value: toNano("0.01")}, {$$type: "Withdraw", amount: toNano(amount)})
            await waitForTransaction(seqno, walletContract)
            console.log(`\ttotal: ${await contract.getTotal()}`)
            console.log(`\tavailable: ${await contract.getAvailable()}`)
        }
    }
}

async function main() {
    const args = process.argv.slice(2)
    if (args.length < 2) {
        console.log(`
Usage: pnpm run play <contractAddress> <command> <arg?>
Commands are
    - total             - total amount of TON transferred to the contract
    - available         - amount of TON available for withdrawal
    - pay <amount>      - spend "amount" of TONs to the contract
    - withdraw <amount> - withdraw "amount" to the address of the owner/deployer
`)
    }
    const [address, cmd, arg] = args

    const client = await getTonClient()
    const {contract: walletContract, sender} = await loadWallet(client)
    const contract = client.open(Spender.fromAddress(Address.parse(address)))
    const counterClient = ContractClient(contract, walletContract)

    switch (cmd) {
        case 'total':
            await counterClient.getTotal()
            break
        case 'available':
            await counterClient.getAvailable()
            break
        case 'pay':
            await counterClient.pay(sender, arg)
            break
        case 'withdraw':
            await counterClient.withdraw(sender, arg)
            break
        default:
            throw Error(`Unsupported command: ${cmd}`)
    }
}

main().catch(console.log)
