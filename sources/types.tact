
struct MainMessage {
    to: Address;
    self_pay: Int as coins;
    broker_pay: Int as coins;
    body: Cell?;
    code: Cell?;
    data: Cell?;
}

struct JettonMessage {
    wallet: Address;
    code: Cell;
    data: Cell;
    amount: Int as coins;
}