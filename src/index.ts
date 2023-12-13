import ethers, { Wallet, Contract, JsonRpcProvider, parseEther, formatEther, parseUnits, formatUnits } from 'ethers';

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

async function realGas(erc20: Contract) {
  try {
    await erc20.approve('0x3597bfD533a99c9aa083587B074434E61Eb0A258', 1n);
  } catch (error: any) {
    const num = /tx cost (\d+)/.exec(error.info.error.message)?.[1];
    if (num != null) return BigInt(num);
  }
  throw Error();
}

export
async function hello() {
  const provider = new JsonRpcProvider(secret.alchemyKey);
  const wallet = new Wallet(secret.privateKey, provider);
  console.log(wallet.address);
  const balance = await provider.getBalance(wallet.address);
  console.log(formatEther(balance));

  const erc20 = new Contract('0x3597bfD533a99c9aa083587B074434E61Eb0A258', [
    'function approve(address, uint256) returns (bool)'
  ], wallet);

  console.log(await realGas(erc20));

  watch(async () => {
    const [tgas, fee] = await Promise.all([
      realGas(erc20),
      provider.getFeeData(),
    ]);
    console.log(tgas, fee.gasPrice);
  }, 5000);
}
