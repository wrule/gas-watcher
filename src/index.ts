import ethers, { Wallet, HDNodeWallet, Contract, JsonRpcProvider, parseEther, formatEther, parseUnits, formatUnits, Mnemonic } from 'ethers';

(BigInt.prototype as any).toJSON = function() { return this.toString(); };
const secret = require('../.secret.json');

async function watch(func: () => any, interval = 2000) {
  try {
    await func();
  } catch (error) {
    console.error(error);
  }
  setTimeout(() => {
    watch(func, interval);
  }, interval);
}

export
async function hello() {
  const provider = new JsonRpcProvider(secret.apiKey);
  const mnemonic = Mnemonic.fromPhrase(secret.phrase);
  const addrList = Array(200).fill(0).map((_, index) =>
    HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`).address
  );
  const erc721 = new Contract(
    '0xf1b33ac32dbc6617f7267a349be6ebb004feccff',
    ['function balanceOf(address) view returns (uint256)'],
    provider,
  );
  for (let i = 0; i < addrList.length; ++i) {
    const address = addrList[i];
    const count = await erc721.balanceOf(address);
    console.log(i);
    if (count > 0n) {
      console.log(address, count);
    }
  }
}
