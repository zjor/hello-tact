import { Spender } from "./output/spender_Spender";
import {toNano} from "ton-core";
import {getTonClient, loadWallet, waitForTransaction} from "./ton-utils";


async function deploy() {

    const client = await getTonClient()

    const { contract: walletContract, sender } = await loadWallet(client)

    const contract = await Spender.fromInit()

    console.log("Contract address:", contract.address.toString());
    const isAlreadyDeployed = await client.isContractDeployed(contract.address);

    const openedContract = client.open(contract)

    if (!isAlreadyDeployed) {
        console.log("Sending a deployment transaction transaction")
        const seqno = await walletContract.getSeqno();
        await openedContract.send(sender, {value: toNano("0.01"), bounce: false}, {$$type: "Deploy", queryId: BigInt(1)})
        await waitForTransaction(seqno, walletContract)
    } else {
        console.log("Contract has been already deployed")
    }
    console.log(`Visit: https://tonscan.org/address/${contract.address.toString()}`)
}

deploy().catch(console.log);

