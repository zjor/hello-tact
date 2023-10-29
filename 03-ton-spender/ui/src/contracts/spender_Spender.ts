/* eslint-disable */
// @ts-nocheck

import {
    ABIGetter,
    ABIReceiver,
    ABIType,
    Address,
    beginCell,
    Builder,
    Cell,
    Contract,
    ContractABI,
    contractAddress,
    ContractProvider,
    DictionaryValue,
    Sender,
    Slice,
    TupleBuilder,
    TupleReader
} from 'ton-core'

export type StateInit = {
    $$type: 'StateInit'
    code: Cell
    data: Cell
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder
        b_0.storeRef(src.code)
        b_0.storeRef(src.data)
    }
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice
    let _code = sc_0.loadRef()
    let _data = sc_0.loadRef()
    return { $$type: 'StateInit' as const, code: _code, data: _data }
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell()
    let _data = source.readCell()
    return { $$type: 'StateInit' as const, code: _code, data: _data }
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder()
    builder.writeCell(source.code)
    builder.writeCell(source.data)
    return builder.build()
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell())
        },
        parse: src => {
            return loadStateInit(src.loadRef().beginParse())
        }
    }
}

export type Context = {
    $$type: 'Context'
    bounced: boolean
    sender: Address
    value: bigint
    raw: Cell
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder
        b_0.storeBit(src.bounced)
        b_0.storeAddress(src.sender)
        b_0.storeInt(src.value, 257)
        b_0.storeRef(src.raw)
    }
}

export function loadContext(slice: Slice) {
    let sc_0 = slice
    let _bounced = sc_0.loadBit()
    let _sender = sc_0.loadAddress()
    let _value = sc_0.loadIntBig(257)
    let _raw = sc_0.loadRef()
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw }
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean()
    let _sender = source.readAddress()
    let _value = source.readBigNumber()
    let _raw = source.readCell()
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw }
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder()
    builder.writeBoolean(source.bounced)
    builder.writeAddress(source.sender)
    builder.writeNumber(source.value)
    builder.writeSlice(source.raw)
    return builder.build()
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell())
        },
        parse: src => {
            return loadContext(src.loadRef().beginParse())
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters'
    bounce: boolean
    to: Address
    value: bigint
    mode: bigint
    body: Cell | null
    code: Cell | null
    data: Cell | null
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder
        b_0.storeBit(src.bounce)
        b_0.storeAddress(src.to)
        b_0.storeInt(src.value, 257)
        b_0.storeInt(src.mode, 257)
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body)
        } else {
            b_0.storeBit(false)
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code)
        } else {
            b_0.storeBit(false)
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data)
        } else {
            b_0.storeBit(false)
        }
    }
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice
    let _bounce = sc_0.loadBit()
    let _to = sc_0.loadAddress()
    let _value = sc_0.loadIntBig(257)
    let _mode = sc_0.loadIntBig(257)
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null
    return {
        $$type: 'SendParameters' as const,
        bounce: _bounce,
        to: _to,
        value: _value,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data
    }
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean()
    let _to = source.readAddress()
    let _value = source.readBigNumber()
    let _mode = source.readBigNumber()
    let _body = source.readCellOpt()
    let _code = source.readCellOpt()
    let _data = source.readCellOpt()
    return {
        $$type: 'SendParameters' as const,
        bounce: _bounce,
        to: _to,
        value: _value,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data
    }
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder()
    builder.writeBoolean(source.bounce)
    builder.writeAddress(source.to)
    builder.writeNumber(source.value)
    builder.writeNumber(source.mode)
    builder.writeCell(source.body)
    builder.writeCell(source.code)
    builder.writeCell(source.data)
    return builder.build()
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell())
        },
        parse: src => {
            return loadSendParameters(src.loadRef().beginParse())
        }
    }
}

export type Deploy = {
    $$type: 'Deploy'
    queryId: bigint
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder
        b_0.storeUint(2490013878, 32)
        b_0.storeUint(src.queryId, 64)
    }
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice
    if (sc_0.loadUint(32) !== 2490013878) {
        throw Error('Invalid prefix')
    }
    let _queryId = sc_0.loadUintBig(64)
    return { $$type: 'Deploy' as const, queryId: _queryId }
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber()
    return { $$type: 'Deploy' as const, queryId: _queryId }
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder()
    builder.writeNumber(source.queryId)
    return builder.build()
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell())
        },
        parse: src => {
            return loadDeploy(src.loadRef().beginParse())
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk'
    queryId: bigint
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder
        b_0.storeUint(2952335191, 32)
        b_0.storeUint(src.queryId, 64)
    }
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice
    if (sc_0.loadUint(32) !== 2952335191) {
        throw Error('Invalid prefix')
    }
    let _queryId = sc_0.loadUintBig(64)
    return { $$type: 'DeployOk' as const, queryId: _queryId }
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber()
    return { $$type: 'DeployOk' as const, queryId: _queryId }
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder()
    builder.writeNumber(source.queryId)
    return builder.build()
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell())
        },
        parse: src => {
            return loadDeployOk(src.loadRef().beginParse())
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy'
    queryId: bigint
    cashback: Address
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder
        b_0.storeUint(1829761339, 32)
        b_0.storeUint(src.queryId, 64)
        b_0.storeAddress(src.cashback)
    }
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice
    if (sc_0.loadUint(32) !== 1829761339) {
        throw Error('Invalid prefix')
    }
    let _queryId = sc_0.loadUintBig(64)
    let _cashback = sc_0.loadAddress()
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback }
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber()
    let _cashback = source.readAddress()
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback }
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder()
    builder.writeNumber(source.queryId)
    builder.writeAddress(source.cashback)
    return builder.build()
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell())
        },
        parse: src => {
            return loadFactoryDeploy(src.loadRef().beginParse())
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw'
    amount: bigint
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder
        b_0.storeUint(195467089, 32)
        b_0.storeCoins(src.amount)
    }
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice
    if (sc_0.loadUint(32) !== 195467089) {
        throw Error('Invalid prefix')
    }
    let _amount = sc_0.loadCoins()
    return { $$type: 'Withdraw' as const, amount: _amount }
}

function loadTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber()
    return { $$type: 'Withdraw' as const, amount: _amount }
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder()
    builder.writeNumber(source.amount)
    return builder.build()
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdraw(src)).endCell())
        },
        parse: src => {
            return loadWithdraw(src.loadRef().beginParse())
        }
    }
}

type Spender_init_args = {
    $$type: 'Spender_init_args'
}

function initSpender_init_args(src: Spender_init_args) {
    return (builder: Builder) => {
        let b_0 = builder
    }
}

async function Spender_init() {
    const __code = Cell.fromBase64(
        'te6ccgECFQEAAx0AART/APSkE/S88sgLAQIBYgIDAtbQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AsntVBAEAgEgCQoC8AGSMH/gcCHXScIflTAg1wsf3iDAACLXScEhsI4SW/hCIscFs5j4QW8kE18DoN5/4CCCEAuml1G6jr0w0x8BghALppdRuvLggfoAATGBbRH4QlJAxwXy9IIAyir4J28QggiYloChUiC78vT4Qn9YchAjbW1t2zx/4AcFAWaCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAGATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAcByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsACACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIRvCz22ebZ42EMEAsCASAMDQAI+CdvEAIBIA4PAgFIExQCEbUIu2ebZ42EMBARAJW3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJABgO1E0NQB+GPSAAGOJfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gBZbBLgMPgo1wsKgwm68uCJ2zwSAAIgAAb4QnAAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtZTlNODJ0bWtRVmdob0tkY3BERXgzd2M3aU5NTm5Fa1FVdFUyUVhNNWZBQzeCA='
    )
    const __system = Cell.fromBase64(
        'te6cckECFwEAAycAAQHAAQEFoLZXAgEU/wD0pBP0vPLICwMCAWIPBAIBIA0FAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtZTlNODJ0bWtRVmdob0tkY3BERXgzd2M3aU5NTm5Fa1FVdFUyUVhNNWZBQzeCAAEbCvu1E0NIAAYAIBIAsKAJW3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJACEbUIu2ebZ42EMBUMAAIgAhG8LPbZ5tnjYQwVDgAI+CdvEALW0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wts88uCCyPhDAcx/AcoAWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gLJ7VQVEALwAZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwjhJb+EIixwWzmPhBbyQTXwOg3n/gIIIQC6aXUbqOvTDTHwGCEAuml1G68uCB+gABMYFtEfhCUkDHBfL0ggDKKvgnbxCCCJiWgKFSILvy9PhCf1hyECNtbW3bPH/gExEBZoIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcBIBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8EwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAUAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAYDtRNDUAfhj0gABjiX6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoAWWwS4DD4KNcLCoMJuvLgids8FgAG+EJw0owlkQ=='
    )
    let builder = beginCell()
    builder.storeRef(__system)
    builder.storeUint(0, 1)
    initSpender_init_args({ $$type: 'Spender_init_args' })(builder)
    const __data = builder.endCell()
    return { code: __code, data: __data }
}

const Spender_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    27921: { message: `Only owner is allowed to withdraw` },
    51754: { message: `Insufficient funds` }
}

const Spender_types: ABIType[] = [
    {
        name: 'StateInit',
        header: null,
        fields: [
            { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
            { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } }
        ]
    },
    {
        name: 'Context',
        header: null,
        fields: [
            { name: 'bounced', type: { kind: 'simple', type: 'bool', optional: false } },
            { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
            { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'raw', type: { kind: 'simple', type: 'slice', optional: false } }
        ]
    },
    {
        name: 'SendParameters',
        header: null,
        fields: [
            { name: 'bounce', type: { kind: 'simple', type: 'bool', optional: false } },
            { name: 'to', type: { kind: 'simple', type: 'address', optional: false } },
            { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'mode', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
            { name: 'code', type: { kind: 'simple', type: 'cell', optional: true } },
            { name: 'data', type: { kind: 'simple', type: 'cell', optional: true } }
        ]
    },
    {
        name: 'Deploy',
        header: 2490013878,
        fields: [{ name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }]
    },
    {
        name: 'DeployOk',
        header: 2952335191,
        fields: [{ name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }]
    },
    {
        name: 'FactoryDeploy',
        header: 1829761339,
        fields: [
            { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
            { name: 'cashback', type: { kind: 'simple', type: 'address', optional: false } }
        ]
    },
    {
        name: 'Withdraw',
        header: 195467089,
        fields: [{ name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } }]
    }
]

const Spender_getters: ABIGetter[] = [
    { name: 'total', arguments: [], returnType: { kind: 'simple', type: 'int', optional: false, format: 257 } },
    { name: 'available', arguments: [], returnType: { kind: 'simple', type: 'int', optional: false, format: 257 } }
]

const Spender_receivers: ABIReceiver[] = [
    { receiver: 'internal', message: { kind: 'empty' } },
    { receiver: 'internal', message: { kind: 'typed', type: 'Withdraw' } },
    { receiver: 'internal', message: { kind: 'typed', type: 'Deploy' } }
]

export class Spender implements Contract {
    readonly address: Address
    readonly init?: { code: Cell; data: Cell }
    readonly abi: ContractABI = {
        types: Spender_types,
        getters: Spender_getters,
        receivers: Spender_receivers,
        errors: Spender_errors
    }

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address
        this.init = init
    }

    static async init() {
        return await Spender_init()
    }

    static async fromInit() {
        const init = await Spender_init()
        const address = contractAddress(0, init)
        return new Spender(address, init)
    }

    static fromAddress(address: Address) {
        return new Spender(address)
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: null | Withdraw | Deploy
    ) {
        let body: Cell | null = null
        if (message === null) {
            body = new Cell()
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell()
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell()
        }
        if (body === null) {
            throw new Error('Invalid message type')
        }

        await provider.internal(via, { ...args, body: body })
    }

    async getTotal(provider: ContractProvider) {
        let builder = new TupleBuilder()
        let source = (await provider.get('total', builder.build())).stack
        let result = source.readBigNumber()
        return result
    }

    async getAvailable(provider: ContractProvider) {
        let builder = new TupleBuilder()
        let source = (await provider.get('available', builder.build())).stack
        let result = source.readBigNumber()
        return result
    }
}
