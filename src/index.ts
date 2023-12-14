import ethers, { Wallet, Contract, JsonRpcProvider, parseEther, formatEther, parseUnits, formatUnits } from 'ethers';

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
  const provider = new JsonRpcProvider(secret.alchemyKey);
  watch(async () => {
    const fee = await provider.getFeeData();
    console.log(
      `${JSON.stringify([fee.gasPrice, fee.maxPriorityFeePerGas, fee.maxFeePerGas])},`
    );
  });
}
