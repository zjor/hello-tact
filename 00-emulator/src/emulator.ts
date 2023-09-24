import { toNano } from "ton"
import { Blockchain, type SandboxContract } from "@ton-community/sandbox"
import { Greeting } from "./output/contract_Greeting"

async function main() {
  const blockchain = await Blockchain.create();
  const deployer = await blockchain.treasury("deployer");

  const contract = blockchain.openContract(await Greeting.fromInit(deployer.address));
  await contract.send(
      deployer.getSender(),
      {
        value: toNano("0.01")
      },
      {
        $$type: "Deploy",
        queryId: BigInt(1)
      })
  console.log(await contract.getGreet("Mike"))
}

main().catch(console.log)
