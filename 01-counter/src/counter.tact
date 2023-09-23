import "@stdlib/deploy";

contract Greeting with Deployable {
    init() {}

    get fun greet(): String {
        return "Hello world";
    }

}
