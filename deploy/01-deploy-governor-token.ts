import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { networkConfig, developmentChains } from "../helper-hardhat-config"
// import verify from "../helper-functions"

const DeployGovernanceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // code here
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Deploying Governance Token..");
  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    // waitConfirmations: networkConfig[network.name].blockConfirmations || 1, // using for automatic verify stuff
  });

  log(`GovernanceToken at ${governanceToken.address}`);

  /* auto verify
  // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
  //   await verify(governanceToken.address, [])
  // }
  */

  await delegate(governanceToken.address, deployer);
  log("Delegated");
};

const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
  const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
  const tx = await governanceToken.delegate(delegatedAccount);
  tx.wait(1);
  console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`);
}
export default DeployGovernanceToken;