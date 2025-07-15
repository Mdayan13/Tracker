const GasTracker = require("../services/gasTracker")
const { getNetworkConfig } = require("../utils/networks")
const displayHelper = require("../utils/display.js")
const CliHelper = require("../utils/cli")


class GasPriceCommand {
     constructor() {
          this.Tracker = null,
               this.intervalId = null
     }

     async execute() {
          try {

               //select Network By sendign option to user
               const networkKey = await CliHelper.selectNetwork();
               const NetworkConfig = getNetworkConfig(networkKey);
               //initialixe the tracker to be ready
               this.Tracker = new GasTracker(NetworkConfig);

               //ask to select refers inerval start Tracking
               const refreshInterval = await CliHelper.refreshInterval()

               await this.StartTracking(NetworkConfig, refreshInterval)
          } catch (error) {
               // displayHelper.showError(error.message);
               console.log(error)

          };
     }
     async StartTracking(networkConfig, refreshInterval) {
          //clear the display 
          displayHelper.clearScreen();
          displayHelper.showHeader(`${networkConfig.name} || $${await this.Tracker.getEthPriceUSD()}`);


          //fetch the data
          await this.fetchAndDisplayGasPrice(networkConfig);

          //inializing interval to rfresh the fetchinf
          this.intervalId = setInterval(async () => {
               await this.fetchAndDisplayGasPrice(networkConfig)
          }, refreshInterval);


          //handle shutdown by user when user user ctrl+c to stop 
          process.on('SIGINT', () => {
               if (this.intervalId) {
                    clearInterval(this.intervalId);
               }
               displayHelper.showInfo("🔸🔸🔸 🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸");
               process.exit(0);
          })
     }
     //this fuction fetch the data and reurns it 
     async fetchAndDisplayGasPrice(networkConfig) {
          //loader to fetch data in backgeroung
          const spinner = displayHelper.showLoading("grabbing the Data <🥷 🥷> ");

          try {
               const gasData = await this.Tracker.getEIP1559GasPrice(networkConfig);
               const EthPrice = await this.Tracker.getEthPriceUSD();
               spinner.stop();
               displayHelper.showInfo(`currently the 1 Ethereum Price is-->${EthPrice}`)
               //create the table for better UI
               const table = displayHelper.GasTable();

               const speeds = [
                    { name: 'Slow', price: gasData.slow, time: 300 },
                    { name: 'Standard', price: gasData.standard, time: 120 },
                    { name: 'Fast', price: gasData.fast, time: 30 }
               ];

               speeds.forEach(speed => {
                    const cost = this.Tracker.calculateTransctionFee(speed.price, 21000, EthPrice);
                    table.push([
                         speed.name,
                         displayHelper.FormatGasPrice(speed.price.toFixed(2), networkConfig.gasUnit),
                         displayHelper.formatTime(speed.time),
                         displayHelper.formatUsd(cost.USD)
                    ]);
               });
               console.clear();
               displayHelper.showHeader(`${networkConfig.name} || ${await this.Tracker.getEthPriceUSD()}`);
               console.log(table.toString());

               //show additional info
               if (gasData.baseFee) {
                    displayHelper.showInfo(`Base Fee->  ${gasData.baseFee.toFixed(2)} ${networkConfig.gasUnit}`)
               }

               displayHelper.showInfo(`Last updated: ${new Date().toLocaleTimeString()}`);
               displayHelper.showSuccess(' wanna build a project together --> https://github.com/Mdayan13');
          } catch (error) {
               spinner.stop();
               displayHelper.showError(error)
               process.exit(0)

          }
     }


}

const handleGasPrice = async () => {
     const command = new GasPriceCommand();
     // console.log('Selected network key:', networkKey);
     // console.log('Network config:', NetworkConfig);
     // console.log('Available networks:', Object.keys(NETWORKS));
     await command.execute();
};

module.exports = {
     handleGasPrice,
     GasPriceCommand
}