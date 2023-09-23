import "@stdlib/deploy";

contract Counter with Deployable {

    counter: Int as uint32;

    init() {
        self.counter = 0;
    }

    receive("inc") {
        self.counter = self.counter + 1;
        self.reply("cashback".asComment());
    }

    get fun counter(): Int {
        return self.counter;
    }

}
