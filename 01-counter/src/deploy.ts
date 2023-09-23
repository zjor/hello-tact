import {Counter} from "./output/counter_Counter";
import {contractAddress as getContractAddress, toNano} from "ton-core";
import {getTonClient, loadWallet, waitForTransaction} from "./ton-utils";


async function deploy() {
    const initialValue = BigInt(3)

    const client = await getTonClient()

    const { wallet, contract: walletContract, sender } = await loadWallet(client)

    const initState = await Counter.init()
    const contractAddress = getContractAddress(0, initState)

    console.log("Contract address:", contractAddress.toString());
    console.log(`Visit: https://tonscan.org/address/${contractAddress.toString()}`)
    const isAlreadyDeployed = await client.isContractDeployed(contractAddress);

    const seqno = await walletContract.getSeqno();

    const counter = await Counter.fromInit()

    console.log("Sending transaction")
    const openedCounter = client.open(counter)

    if (!isAlreadyDeployed) {
        await openedCounter.send(sender, {value: toNano("0.01"), bounce: false}, {$$type: "Deploy", queryId: BigInt(1)})
        await waitForTransaction(seqno, walletContract)
    } else {
        console.log("Contract has been already deployed")
        console.log(await openedCounter.getCounter())
    }
}

deploy().catch(console.log);

