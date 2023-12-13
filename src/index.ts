import ethers, { Wallet, Contract, JsonRpcProvider, parseEther, formatEther, parseUnits, formatUnits } from 'ethers';

const secret = require('../.secret.json');

export
async function hello() {
  console.log(formatEther('3340656982859224'));
  const provider = new JsonRpcProvider(secret.alchemyKey);
  const wallet = new Wallet(secret.privateKey, provider);
  console.log(wallet.address);
  const balance = await provider.getBalance('0x7F3b3C3f7e69E91D95a32f0A054B8C1B3167865C');
  console.log(balance);
  const erc20 = new Contract('0x3597bfd533a99c9aa083587b074434e61eb0a258', [
    'function decimals() view returns (uint256)',
    'function symbol() view returns (string)',
    'function approve(address _spender, uint256 _value) returns (bool success)'
  ], wallet);
  const decimals = await erc20.decimals();
  console.log(decimals);
  const value = parseUnits('2', decimals);
  const tx = await erc20.approve.estimateGas('0x3597bfd533a99c9aa083587b074434e61eb0a258', value);
  console.log(tx);
  await erc20.approve('0x3597bfd533a99c9aa083587b074434e61eb0a258', value);
  // setInterval(async () => {
  //   const [gas, { gasPrice, maxPriorityFeePerGas, maxFeePerGas }] = await Promise.all([
  //     erc20.approve.estimateGas('0x3597bfd533a99c9aa083587b074434e61eb0a258', value),
  //     provider.getFeeData(),
  //   ]);
  //   if (maxFeePerGas != null && gasPrice != null && maxPriorityFeePerGas != null) {
  //     // console.log(formatUnits(maxPriorityFeePerGas, 'gwei'));
  //     console.log(formatEther(gas * (gasPrice + maxPriorityFeePerGas)));
  //   }
  // }, 2000);
}
