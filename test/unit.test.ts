const bip39 = require("bip39")
import {
    createEthAddress,
    signOpMainnetTransaction,
    ethSign
} from "../src/index";

describe('op stack wallet test', ()=> {
    test('createAddress', () => {
        const mnemonic = "champion junior glimpse analyst plug jump entire barrel slight swim hidden remove";
        const seed = bip39.mnemonicToSeedSync(mnemonic)
        const account = createEthAddress(seed.toString("hex"), "0")
        console.log(account)
    });

    // 0x17b448c6920ACECB87D4a2659008d3401f88Dde6
    // 0x17b448c6920ACECB87D4a2659008d3401f88Dde6
    // 0x17b448c6920ACECB87D4a2659008d3401f88Dde6

    test('sign eth', async () => {
        const rawHex = await signOpMainnetTransaction({
            // 用于签名交易的私钥（16进制格式，不带0x前缀）
            "privateKey": "701ce13dd40a83862b19447ab75553592c122f48e459d99846a424e0b8790732",
            
            // 发送方地址的交易计数器(nonce)，用于防止重放攻击
            "nonce": 28,
            
            // 交易发送方的以太坊地址
            "from": "0x17b448c6920ACECB87D4a2659008d3401f88Dde6",
            
            // 交易接收方的以太坊地址
            "to": "0xe3b4ECd2EC88026F84cF17fef8bABfD9184C94F0",
            
            // 交易的最大gas限制，21000是ETH转账的固定值
            "gasLimit": 21000,
            
            // 要转账的ETH数量
            "amount": "0.01",
            
            // gas价格，单位是wei（3919237255 wei ≈ 3.92 Gwei）
            "gasPrice": 3919237255,
            
            // 代币精度，ETH的精度是18（1 ETH = 10^18 wei）
            "decimal": 18,
            
            // 网络链ID，1代表以太坊主网
            "chainId": 1,
            
            // 代币合约地址，0x00表示这是原生ETH转账
            "tokenAddress": "0x00"
        })
        console.log(rawHex)
    });

    test('sign usdt', async () => {
        const rawHex = await signOpMainnetTransaction({
            "privateKey": "701ce13dd40a83862b19447ab75553592c122f48e459d99846a424e0b8790732",
            "nonce": 30,
            "from": "0x17b448c6920ACECB87D4a2659008d3401f88Dde6",
            "to": "0xe3b4ECd2EC88026F84cF17fef8bABfD9184C94F0",
            "gasLimit": 120000,
            "amount": "0.44",
            "gasPrice": 1019237255,
            "decimal": 6,
            "chainId": 1,
            "tokenAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "tokenId": "0x00"
        })
        console.log(rawHex)
    });

    /*
     * EffectivePriorityFee = min(MaxPriorityFee, MaxFee − BaseFee)
     * TotalFee = GasUsed × (BaseFee + EffectivePriorityFee)
     */
    test('sign eip1559', async () => {
        const rawHex = ethSign({
            "privateKey": "701ce13dd40a83862b19447ab75553592c122f48e459d99846a424e0b8790732",
            "nonce": 30,
            "from": "0x17b448c6920ACECB87D4a2659008d3401f88Dde6",
            "to": "0xe3b4ECd2EC88026F84cF17fef8bABfD9184C94F0",
            "amount": "0.01",
            "gasLimit": 120000,
            "maxFeePerGas": 2900000000,
            "maxPriorityFeePerGas": 2600000000,
            "decimal": 18,
            "chainId": 1,
            "tokenAddress": "0x00"
        })
        console.log(rawHex)
    });
});