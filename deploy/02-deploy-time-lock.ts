import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
// import { ethers } from 'hardhat';
import { MIN_DELAY } from '../helper-hardhat-config';
// import { networkConfig, developmentChains } from "../helper-hardhat-config"
// import verify from "../helper-functions"


const DeployTimelock: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log(`==================================\nDeploying Timelock....`);

  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
    // // we need to wait if on a live network so we can verify properly
    // waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  log(`TimeLock at ${timeLock.address}`)
  /* auto verify
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(timeLock.address, [])
  }
  */
}

export default DeployTimelock
// DeployTimeLock.tags = ["all", "timelock"]
