
const axios = require('axios')


require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });


class GasTracker {
     constructor(networkConfig) {
          this.network = networkConfig;
          this.ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
     }

     //to  get the gas price 
     async getGasPrice() {
          console.log(`${this.network.rpcUrl}${this.ALCHEMY_API_KEY}`)
          try {
               //hre axios is making an post request where
               const response = await axios.post(
                    `${this.network.rpcUrl}${this.ALCHEMY_API_KEY}`, {
                    jsonrpc: '2.0',
                    method: 'eth-gasPrice',
                    params: [],
                    id: 1
               },
                    {
                         Headers: {
                              'content-type': 'application/json'
                         }
                    }
               );
               const gasPriceWei = parseInt(response.data.result, 16);
               const gasPriceGwei = gasPriceWei / 1e9;

               return {
                    wei: gasPriceWei,// gas prce in wei
                    gwei: gasPriceGwei, // gas price in Gwei
                    standard: gasPriceGwei, // standard used to decide gas price
                    fast: gasPriceGwei * 1.2,// 20% percent higher
                    slow: gasPriceGwei * 0.8 // 20% lower price but time dalay 
               };
          } catch (error) {
               throw new Error(`Fuck Fuck Fuck failed to fetch gas price --->${error}`);
          }
     }
     //currrent Live Usd Price to calculate the Gas Price
     async getEthPriceUSD() {
          try {
               const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                    params: {
                         ids: 'ethereum',
                         vs_currencies: 'usd'
                    }
               });

               return response.data.ethereum.usd; // e.g. 3275.42
          } catch (error) {
               console.error("Failed to fetch ETH price:", error.message);
               return 2900; // fallback to default
          }
     }

     /**
      * this function fetch the gasprice on EIP559 in simple wword the validor charge the tip on transaction this is like that upgraded contracts 
      */
     async getEIP1559GasPrice() {
          try {
               const response = await axios.post(
                    `${this.network.rpcUrl}${this.ALCHEMY_API_KEY}`, {
                    jsonrpc: '2.0',
                    method: 'eth_feeHistory',
                    params: [4, 'latest', [25, 50, 75]],
                    id: 1
               }
               );

               const feeHistory = response.data.result;
               const baseFee = parseInt(feeHistory.baseFeePerGas[feeHistory.baseFeePerGas.length - 1], 16) / 1e9;
               //

               return {
                    baseFee,
                    slow: baseFee + 1,
                    standard: baseFee + 2,
                    fast: baseFee + 3,
               };

          } catch (error) {
               // Fallback to regular gas price if EIP-1559 not supported
               return this.getGasPrice();
          }
     }
     /**
      * cakculate the transaction fee
      */
     calculateTransctionFee(gasPrice, gasLimit = 21000, ethPrice = 2000) {
          const costInEth = (gasPrice * gasLimit) / 1e9;
          const CosstInUSD = costInEth * ethPrice;
          return {
               ETH: costInEth,
               USD: CosstInUSD
          };
     }

     getEstimatedTime(gasPrice, NetworkCongestion = 'medium') {
          const TimeMap = {
               low: { slow: 300, standard: 180, fast: 60 },
               medium: { slow: 180, standard: 120, fast: 30 },
               high: { slow: 120, standard: 60, fast: 15 }
          };
          return TimeMap[NetworkCongestion] || TimeMap.medium;
     }
}
module.exports = GasTracker;
