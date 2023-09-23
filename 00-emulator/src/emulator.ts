import { toNano } from "ton"
import { ContractSystem } from "@tact-lang/emulator"
import { Greeting } from "./output/contract_Greeting"

async function main() {
  let system = await ContractSystem.create()
  let owner = system.treasure("owner")
  let nonOwner = system.treasure("non-owner")

  // @ts-ignore
  let contract = system.open(await Greeting.fromInit(owner.address));
}

main().catch(console.log)
