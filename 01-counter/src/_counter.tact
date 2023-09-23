message SetValue {
    value: Int as uint32;
}

contract Counter {

    owner: Address;
    counter: Int as uint32;

    init(owner: Address, initialValue: Int) {
        self.owner = owner;
        self.counter = initialValue;
    }

    receive(msg: SetValue) {
        self.counter = msg.value;
        // TODO: return excess gas
    }

    receive("increment") {
        self.counter = (self.counter + 1);
        // TODO: return excess gas
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun owner(): Address {
        return self.owner;
    }
}
