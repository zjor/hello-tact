// import {Counter, SetValue} from "./output/counter_Counter";
import { Greeting, Deploy } from "./output/counter_Greeting"
import {contractAddress as getContractAddress, toNano} from "ton-core";
import {getTonClient, loadWallet, waitForTransaction} from "./ton-utils";


async function deploy() {
    const initialValue = BigInt(3)

    const client = await getTonClient()

    const { wallet, contract: walletContract, sender } = await loadWallet(client)

    // const initState = await Counter.init(wallet.address, initialValue)
    const initState = await Greeting.init()
    const contractAddress = getContractAddress(0, initState)

    console.log("Contract address:", contractAddress.toString());
    console.log(`Visit: https://tonscan.org/address/${contractAddress.toString()}`)
    const isAlreadyDeployed = await client.isContractDeployed(contractAddress);

    const seqno = await walletContract.getSeqno();

    // const counter = await Counter.fromInit(wallet.address, initialValue)
    const counter = await Greeting.fromInit()

    console.log("Sending transaction")
    const openedCounter = client.open(counter)

    // const message: SetValue = {
    //     $$type: 'SetValue',
    //     value: BigInt(1)
    // }
    //
    // await openedCounter.send(sender, {value: toNano("0.01"), bounce: false}, message)
    if (!isAlreadyDeployed) {
        await openedCounter.send(sender, {value: toNano("0.01"), bounce: false}, {$$type: "Deploy", queryId: BigInt(1)})
        await waitForTransaction(seqno, walletContract)
    } else {
        console.log("Contract has been already deployed")
        console.log(await openedCounter.getGreet())
    }
}

deploy().catch(console.log);

