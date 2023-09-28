import "@stdlib/deploy";

message Withdraw {
    amount: Int as coins;
}

contract Spender with Deployable {

    /* enough for 1 KB of storage for 2.5 years */
    const MIN_TON_FOR_STORAGE: Int = ton("0.01");

    owner: Address;

    /* total amount transferred over the lifetime */
    total: Int as coins;

    init() {
        self.owner = sender();
        self.total = 0;
    }

    receive() {
        // we don't count if the owner transfers coins to the contract
        if (self.owner != sender()) {
            self.total = self.total + context().value;
        }
    }

    receive(msg: Withdraw) {
        require(sender() == self.owner, "Only owner is allowed to withdraw");
        require(msg.amount <= myBalance() - self.MIN_TON_FOR_STORAGE, "Insufficient funds");
        send(SendParameters {
            to: sender(),
            bounce: true,
            value: msg.amount,
            mode: SendIgnoreErrors
        });
    }

    get fun total(): Int {
        return self.total;
    }

    get fun available(): Int {
        return myBalance();
    }
}
