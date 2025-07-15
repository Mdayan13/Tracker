const ora = require('ora'); //loading Porcess

const chalk = require('chalk')
const chaik = require('chalk')
const table = require('cli-table3')

class displayHelper {
     static GasTable() {
          return new table({
               head: [
                    chaik.cyan('Speed'),
                    chalk.cyan('GasPrice'),
                    chaik.cyan('Est. Time'),
                    chalk.cyan('$USD cost*')
               ],
               colWidths: [12, 15, 12, 12]
          });
     }

     static FormatGasPrice(price, unit = 'gwei') {
          return `${price} ${unit}`
     }


     //this converts thr time seconds in MIniute and Houe 
     static formatTime(seconds) {
          const h = Math.floor(seconds / 3600);
          const m = Math.floor((seconds % 3600) / 60);
          const s = seconds % 60;

          const parts = [];
          if (h > 0) parts.push(`${h}h`);
          if (m > 0) parts.push(`${m}m`);
          if (s > 0 && parts.length === 0) parts.push(`${s}s`);
          return parts.join(' ');
     }

     static formatUsd(amount) {
          return `${amount.toFixed(2)}`// $40 = $40.00
     }


     /**
      * @result UI
     ==================================================
     ⛽ Gas Tracker - fuck bou 
     ==================================================
      */
     static showHeader(networkName) {
          console.log('\n' + chalk.bold.blue('='.repeat(50)));
          console.log(chalk.bold.yellow(`⛽ Gas Tracker - ${networkName}`));
          console.log(chalk.bold.blue('='.repeat(50)));
     }

/**
 * @param message - The message to display while data is being fetched.
 */
     static showLoading(message) {
          return ora(message).start();
     }
/**
 * 
 * @param message this message to shown while face any error 
 */
     static showError(message) {
          console.log(chalk.red(`❌ Error: ${message}`));
     }
/**
 * 
 * @param  message to display when fetching is success
 */
     static showSuccess(message) {
          console.log(chalk.green(`✅ ${message}`));
     }
/**
 * 
 * @param  message this is to dispplay the info 
 */
     static showInfo(message) {
          console.log(chalk.blue(`ℹ️  ${message}`));
     }
/**
 * this clear the screen at the end
 */
     static clearScreen() {
          console.clear();
     }

}

module.exports = displayHelper;