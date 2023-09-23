// just to make legacy code work
message SetValue {
    value: Int as uint32;
}

message FirstChoice {
    choice: Int as uint8;
}

message SecondChoice {
    choice: Int as uint8;
}

contract Counter {
    winningDoor: Int as uint8 = 0;
    firstChoice: Int as uint8 = 0;
    secondChoice: Int as uint8 = 0;

    e1: Int as uint8 = 0;
    e2: Int as uint8 = 0;

    init(owner: Address, seqno: Int) {
    }

    receive("start") {
        self.winningDoor = random(1, 3);

        if (self.winningDoor == 1) {
            self.e1 = 2;
            self.e2 = 3;
        } else if (self.winningDoor == 2) {
            self.e1 = 1;
            self.e2 = 3;
        } else {
            self.e1 = 1;
            self.e2 = 2;
        }

        self.firstChoice = 0;
        self.secondChoice = 0;
        self.reply("cashback".asComment());
    }

    receive(msg: FirstChoice) {
        require(self.winningDoor > 0, "The game has not started yet");
        require(self.firstChoice == 0, "firstChoice should be 0");
        require(msg.choice >= 1 && msg.choice <= 3, "The choice must be within [1..3]");
        self.firstChoice = msg.choice;
    }

    receive(msg: SecondChoice) {
        require(self.winningDoor > 0, "The game has not started yet");
        require(self.firstChoice > 0, "The first choice has to be made");
        require(msg.choice >= 1 && msg.choice <= 3, "The choice must be within [1..3]");
        self.secondChoice = msg.choice;
        if (self.winningDoor == self.secondChoice) {
            self.reply("Congratulations! You've won!".asComment());
        } else {
            self.reply("You've lost".asComment());
        }
    }

    get fun emptyDoor(): Int {
        require(self.firstChoice > 0, "The first choice has to be made");
        if (self.firstChoice == self.e1) {
            return self.e2;
        } else {
            return self.e1;
        }
    }

    get fun gameStatus(): Bool {
        require(self.secondChoice > 0, "The second choice has to be made");
        return self.secondChoice == self.winningDoor;
    }

    // legacy deployer
    receive(msg: SetValue) {
        self.reply("cashback".asComment());
    }

}
