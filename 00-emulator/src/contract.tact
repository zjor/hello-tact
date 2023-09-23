import "@stdlib/deploy";

contract Greeting with Deployable {

    owner: Address;
    seqno: Int as uint32;

    init(owner: Address) {
        self.owner = owner;
        self.seqno = 0;
    }

    get fun greet(name: String): String {
        let s: StringBuilder = beginString();
        s.append("Hello ");
        s.append(name);
        return s.toString();
    }

}
