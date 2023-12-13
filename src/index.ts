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
  const actionGas = await erc20.approve.estimateGas('0x3597bfD533a99c9aa083587B074434E61Eb0A258', 1n);
  console.log(actionGas);

  watch(async () => {
    const fee = await provider.getFeeData();
    if (fee.gasPrice != null && fee.maxPriorityFeePerGas != null) {
      console.log(formatEther(
        (fee.gasPrice + fee.maxPriorityFeePerGas) *
        (21000n)
      ));
    }
  });
}
