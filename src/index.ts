import ethers, { Wallet, Contract, JsonRpcProvider, parseEther, formatEther, parseUnits, formatUnits } from 'ethers';

const secret = require('../.secret.json');

export
async function hello() {
  const provider = new JsonRpcProvider(secret.alchemyKey);
  const wallet = new Wallet(secret.privateKey, provider);
  console.log(wallet.address);
  const balance = await provider.getBalance(wallet.address);
  console.log(formatEther(balance));
}
