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
            "privateKey": "privateKey",
            "nonce": 28,
            "from": "0x72fFaA289993bcaDa2E01612995E5c75dD81cdBC",
            "to": "0xe3b4ECd2EC88026F84cF17fef8bABfD9184C94F0",
            "gasLimit": 21000,
            "amount": "0.01",
            "gasPrice": 3919237255,
            "decimal": 18,
            "chainId": 1,
            "tokenAddress": "0x00"
        })
        console.log(rawHex)
    });

    test('sign usdt', async () => {
        const rawHex = await signOpMainnetTransaction({
            "privateKey": "privateKey",
            "nonce": 30,
            "from": "0x72fFaA289993bcaDa2E01612995E5c75dD81cdBC",
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
            "privateKey": "privateKey",
            "nonce": 30,
            "from": "0x72fFaA289993bcaDa2E01612995E5c75dD81cdBC",
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