const bip39 = require("bip39")
import {
    createEthAddress,
    signOpMainnetTransaction
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

    test('sign', async () => {
        const rawHex = await signOpMainnetTransaction({
            "privateKey": "701ce13dd40a83862b19447ab75553592c122f48e459d99846a424e0b8790732",
            "nonce": 3,
            "from": "0x17b448c6920ACECB87D4a2659008d3401f88Dde6",
            "to": "0x72fFaA289993bcaDa2E01612995E5c75dD81cdBC",
            "gasLimit": 91000,
            "amount": "0.9",
            "gasPrice": 2721906,
            "decimal": 6,
            "chainId": 10,
            "tokenAddress": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58"
        })
        console.log(rawHex)
    });
});