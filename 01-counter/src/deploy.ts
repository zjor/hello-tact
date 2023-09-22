import {Counter, SetValue} from "./output/counter_Counter";
import {contractAddress as getContractAddress, toNano} from "ton-core";
import {getTonClient, loadWallet, waitForTransaction} from "./ton-utils";


async function deploy() {
    const initialValue = BigInt(3)

    const client = await getTonClient()

    const { wallet, contract: walletContract, sender } = await loadWallet(client)

    const initState = await Counter.init(wallet.address, initialValue)
    const contractAddress = getContractAddress(0, initState)

    console.log("Contract address:", contractAddress.toString());
    console.log(`Visit: https://tonscan.org/address/${contractAddress.toString()}`)
    if (await client.isContractDeployed(contractAddress)) {
        console.log("Contract is already deployed")
        return
    }

    const seqno = await walletContract.getSeqno();

    const counter = await Counter.fromInit(wallet.address, initialValue)

    console.log("Sending transaction")
    const openedCounter = client.open(counter)

    const message: SetValue = {
        $$type: 'SetValue',
        value: BigInt(1)
    }

    await openedCounter.send(sender, {value: toNano("0.01"), bounce: false}, message)
    await waitForTransaction(seqno, walletContract)
}

deploy().catch(console.log);

