import {toNano} from "ton"
import {Blockchain} from "@ton-community/sandbox"
import {Spender} from "./output/spender_Spender";

describe("contract", () => {
    it("should deploy", async () => {
        const blockchain = await Blockchain.create();
        const owner = await blockchain.treasury("owner");
        const contract = blockchain.openContract(await Spender.fromInit());

        console.log(contract.address)

    })
})
