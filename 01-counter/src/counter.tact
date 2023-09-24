import "@stdlib/deploy";    // provides Deployable trait

contract Counter with Deployable {

    counter: Int as uint32;

    init() {
        self.counter = 0;
    }

    receive("increment") {
        self.counter = self.counter + 1;

        // return the remaining TON sent with the transaction keeping only the gas fees
        self.reply("cashback".asComment());
    }

    get fun counter(): Int {
        return self.counter;
    }
}
