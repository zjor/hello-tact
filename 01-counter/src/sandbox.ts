import {getTonClient, loadWallet} from "./ton-utils";
import {fromNano} from "ton-core";

async function main() {
    const client = await getTonClient()
    const {wallet, contract} = await loadWallet(client)

    console.log(`Address: ${wallet.address.toString()}`)
    const balanceNano = await contract.getBalance()
    const balanceTon = parseFloat(balanceNano.toString()) / 1e9
    console.log(`Balance: ${balanceNano} = ${balanceTon} TON`)
}

main().catch(console.log)
