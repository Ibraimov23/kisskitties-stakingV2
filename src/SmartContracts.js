import tokenABI from './assets/data/tokenABI.json';
import stakingABI from './assets/data/stakingABI.json';
import stakingV2ABI from './assets/data/stakingV2ABI.json';
import stakingV3ABI from './assets/data/stakingV3ABI.json';
import { ethers } from "ethers";
import Web3 from 'web3';
import BigNumber from "bignumber.js";
import bigInt from "big-integer";


export class SC {
    static coefficient = 0.000000000000000001;
    static dailyDistribution = 1e27;
    static tokenContract;
    static stakingContract;
    static stakingContractV2;
    static stakingContractV3;
    static web3ojb;
    static tokenInst;
    static tokenInst2;
    static tokenInst3;
    static config = {
        mainChainId: 56,
        tokenContractAddress: '0xe89868153f7748f3dB226E4f60a810a1127BF740',
        stakingContractAddress: '0x62D7EFA609cAc509C9E1Ac47e701597f0f6F9eD3',
        stakingContractV2Address: '0x816215C8fBC94AdFF9D951BbE5f6F530fb926b16',
        stakingContractV3Address: '0x181bD12294bB90F2C61FB219ABf22a09A0E8e4E4',
        mainWallet: '0x71676638Fd1B69173d0923752bfeD3F7b3374Afa',
        timestamp: 1648163253
    };

    static inStake = 0;
    static inStakeV2 = 0;
    static inStakeV3 = 0;
    
static async init(_provider) {
    SC.web3ojb = new Web3(_provider);
    SC.tokenInst = new SC.web3ojb.eth.Contract(stakingABI, SC.config.stakingContractAddress)
    SC.tokenInst2 = new SC.web3ojb.eth.Contract(stakingV2ABI, SC.config.stakingContractV2Address)
    SC.tokenInst3 = new SC.web3ojb.eth.Contract(stakingV3ABI, SC.config.stakingContractV3Address)
    const provider = new ethers.providers.Web3Provider(_provider), signer = provider.getSigner();

    if (!SC.tokenContract) {
        SC.tokenContract = new ethers.Contract(SC.config.tokenContractAddress, tokenABI, signer);
        SC.stakingContract = new ethers.Contract(SC.config.stakingContractAddress, stakingABI, signer);
        SC.stakingContractV2 = new ethers.Contract(SC.config.stakingContractV2Address, stakingV2ABI, signer);
        SC.stakingContractV3 = new ethers.Contract(SC.config.stakingContractV3Address, stakingV3ABI, signer);
    }
}

static async getInHoldTime() {
    const time = await SC.tokenInst.methods.holdingTime().call();
    return parseInt(time);
}
static async getInHoldTimeV2() {
    const time = await SC.tokenInst2.methods.holdingTime().call();
    return parseInt(time);
}
static async getInHoldTimeV3() {
    const time = await SC.tokenInst3.methods.holdingTime().call();
    return parseInt(time);
}

static async getInStackTime(account) {
    const time = await SC.tokenInst.methods.userLastStackedTime(account).call();
    return parseInt(time);
}
static async getInStackTimeV2(account) {
    const time = await SC.tokenInst2.methods.userLastStackedTime(account).call();
    return parseInt(time);
}
static async getInStackTimeV3(account) {
    const time = await SC.tokenInst3.methods.userLastStackedTime(account).call();
    return parseInt(time);
}

static async allowance(account) {
    const contract = SC.tokenContract;
    try {
        let approvedRaw = await contract.allowance(account, SC.stakingContract.address);
        console.log('APPROVED_VALUE', approvedRaw);  
        if (approvedRaw) {
            let approved = parseInt(approvedRaw._hex, '16');
            if (approved) return true;
        }
        return false;
    } catch(e) { console.info(e) }
}
static async allowanceV2(account) {
    const contract = SC.tokenContract;
    try {
        let approvedRaw = await contract.allowance(account, SC.stakingContractV2.address);
        console.log('APPROVED_VALUE', approvedRaw);
        if (approvedRaw) {
            let approved = parseInt(approvedRaw._hex, '16');
            if (approved) return true;
        }
        return false;
    } catch(e) { console.info(e) }
}
static async allowanceV3(account) {
    const contract = SC.tokenContract;
    try {
        let approvedRaw = await contract.allowance(account, SC.stakingContractV3.address);
        console.log('APPROVED_VALUE', approvedRaw);
        if (approvedRaw) {
            let approved = parseInt(approvedRaw._hex, '16');
            if (approved) return true;
        }
        return false;
    } catch(e) { console.info(e) }
}
static async approve() {
     const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
     const contract = SC.tokenContract;
      try {
          let approval = await contract.approve(SC.config.stakingContractAddress, bigNumberValue);

          return !!approval;
      } catch (e) { console.info(e) }
}
static async approveV2() {
    const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
    const contract = SC.tokenContract;
    
    try {
        let approval = await contract.approve(SC.config.stakingContractV2Address, bigNumberValue);
        return !!approval;
    } catch (e) { console.info(e) }
}
static async approveV3() {
    const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
    const contract = SC.tokenContract;
    
    try {
        let approval = await contract.approve(SC.config.stakingContractV3Address, bigNumberValue);
        return !!approval;
    } catch (e) { console.info(e) }
}

static async getEarned(account) {
    const earned = bigInt(await SC.tokenInst.methods.earned(account).call());
    return String(earned.value / 10n ** 18n);
}
static async getEarnedV2(account) {
    const earned = bigInt(await SC.tokenInst2.methods.earned(account).call());
    return String(earned.value / 10n ** 18n);
}
static async getEarnedV3(account) {
    const earned = bigInt(await SC.tokenInst3.methods.earned(account).call());
    const str = String(parseFloat(earned.value) / 10 ** 18).substring(0,6);
    return Math.round((parseFloat(str) + Number.EPSILON) * 100) / 100;
}
static async getInStake(account) {
    const balance = bigInt(await SC.tokenInst.methods.balanceOf(account).call());
    SC.inStake = String(balance.value / 10n ** 18n);
    return String(balance.value / 10n ** 18n);
}
static async getInStakeV2(account) {
    const contract = SC.tokenContract;
    const balance = bigInt(Number(await contract.balanceOf(account)));
    SC.inStakeV2 = String(balance.value / 10n ** 18n);
    return String(balance.value / 10n ** 18n);
}
static async getInStakeV3(account) {
    const contract = SC.tokenContract;
    const balance = bigInt(Number(await contract.balanceOf(account)));
    SC.inStakeV3 = String(balance.value / 10n ** 18n);
    return String(balance.value / 10n ** 18n);
}

static async stake(account, amount) {
    amount = new BigNumber(amount * 10 ** 18);  
    SC.tokenInst.methods.stake(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async stakeV2(account, amount) {
    amount = new BigNumber(amount * 10 ** 18);  
    SC.tokenInst2.methods.stake(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async stakeV3(account, amount) {
    amount = new BigNumber(amount * 10 ** 18);  
    SC.tokenInst3.methods.stake(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}

static async harvest(account) {
    SC.tokenInst.methods.getReward()
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async harvestV2(account) {
    SC.tokenInst2.methods.getReward()
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async harvestV3(account) {
    SC.tokenInst3.methods.getReward()
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
           
static async withdraw(account,amount) {
    amount = new BigNumber(amount * 10 ** 18); 
    SC.tokenInst.methods.withdraw(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async withdrawV2(account,amount) {
    amount = new BigNumber(amount * 10 ** 18); 
    SC.tokenInst2.methods.withdraw(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async withdrawV3(account,amount) {
    amount = new BigNumber(amount * 10 ** 18); 
    SC.tokenInst3.methods.withdraw(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}


static async APR() {
    let count1 = await SC.tokenInst.methods.rewardRate().call();
    let count2 = await SC.tokenInst.methods.totalSupply().call();
    let count = ((bigInt(count1) * 86400 * 365) / (bigInt(count2) / 10 **18)  * 100 ) / 10 **18;
    return Math.trunc(count);
}
static async APRV2() {
    let count1 = await SC.tokenInst2.methods.rewardRate().call();
    let count2 = await SC.tokenInst2.methods.totalSupply().call();
    let count = ((bigInt(count1) * 86400 * 365) / (bigInt(count2) / 10 **18  * 0.369 / 0.00008) * 100) / 10 **18;
    return Math.trunc(count);
}
static async APRV3() {
    let count1 = await SC.tokenInst3.methods.rewardRate().call();
    let count2 = await SC.tokenInst3.methods.totalSupply().call();
    let count = ((bigInt(count1) * 86400 * 365) / (bigInt(count2) / 10 **18  * 0.31) * 100) / 10 **18;
    return Math.trunc(count);
}
}