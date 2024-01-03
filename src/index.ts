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
  const mnemonic = Mnemonic.fromPhrase(secret.phrase);
  const addrList = Array(200).fill(0).map((_, index) =>
    HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`).address
  );
  for (let i = 0; i < addrList.length; ++i) {
    console.log('index', i);
    const address = addrList[i];
    console.log(address);
  }
}
