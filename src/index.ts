import ethers, { Wallet, JsonRpcProvider, parseEther, formatEther } from 'ethers';

const secret = require('../.secret.json');

export
async function hello() {
  const provider = new JsonRpcProvider(secret.alchemyKey);
  const wallet = new Wallet(secret.privateKey, provider);
  console.log(wallet.address);
  const balance = await provider.getBalance('0x28dF8c4d5fc59cA685546e817772181Fb717E503');
  console.log(formatEther(balance));
}
