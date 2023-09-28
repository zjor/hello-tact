import { toNano } from "ton"
import { Blockchain, type SandboxContract } from "@ton-community/sandbox"
import { Spender } from "./output/spender_Spender"

async function main() {
    const blockchain = await Blockchain.create();
    const deployer = await blockchain.treasury("deployer");
    const alice = await blockchain.treasury("alice");

    const contract = blockchain.openContract(await Spender.fromInit());
    await contract.send(
        deployer.getSender(),
        {
            value: toNano("1000")
        },
        {
            $$type: "Deploy",
            queryId: BigInt(1)
        })

    await contract.send(
        alice.getSender(),
        {
            value: toNano("0.5")
        }, null)

    console.log(await contract.getAvailable())
    console.log(await contract.getTotal())

    await contract.send(
        deployer.getSender(),
        {
            value: toNano("0.01")
        },
        {
            $$type: 'Withdraw',
            amount: toNano("0.4")
        }
    )

    console.log(await contract.getAvailable())
    console.log(await contract.getTotal())

}

main().catch(console.log)
