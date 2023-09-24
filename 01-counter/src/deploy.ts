import {Counter} from "./output/counter_Counter";
import {toNano} from "ton-core";
import {getTonClient, loadWallet, waitForTransaction} from "./ton-utils";


async function deploy() {

    const client = await getTonClient()

    const { contract: walletContract, sender } = await loadWallet(client)

    const counter = await Counter.fromInit()

    console.log("Contract address:", counter.address.toString());
    const isAlreadyDeployed = await client.isContractDeployed(counter.address);

    const openedCounter = client.open(counter)

    if (!isAlreadyDeployed) {
        console.log("Sending a deployment transaction transaction")
        const seqno = await walletContract.getSeqno();
        await openedCounter.send(sender, {value: toNano("0.01"), bounce: false}, {$$type: "Deploy", queryId: BigInt(1)})
        await waitForTransaction(seqno, walletContract)
    } else {
        console.log("Contract has been already deployed")
    }
    console.log(`Visit: https://tonscan.org/address/${counter.address.toString()}`)
}

deploy().catch(console.log);

