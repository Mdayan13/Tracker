const inquirer = require('inquirer') // this inquiry the user input what tyoe of data he wants from uer
const {getNetworkChoices} = require('./networks.js') 

/**
 * this class is to let the CLi confirm of which network data he wants 
 */
class CliHelper{

     /**
      * @returns this Prompts teuser to select a network 
      */
      static async selectNetwork() {
      const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'network',
        message: 'Select a network to track gas prices:',
        choices: getNetworkChoices(),//this brings the seelcted network and passed it on 
        pageSize: 10
      }
    ]);
    return answers.network;
  }

/**
 * 
 * @param {message} asks user to Conitnue or not  
 * @returns this return the user wanna contue or not 
 */
static async sonfirmContinue(message = 'continue?'){
     const answers = await inquirer.prompt([
          {
               type: 'confirm',
               name:'continue',
               message: message,
               default: true
          }
     ]);
     return answers.continue;
}
  /**
   * @returns this is for  refresh the data in x intervals of Time
   */
    static async refreshInterval() {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'interval',
        message: 'Select refresh interval:',
        choices: [
          { name: '15 seconds', value: 15000 },
          { name: '30 seconds', value: 30000 },
          { name: '1 minute', value: 60000 },
          { name: '5 minutes', value: 300000 }
        ],
        default: 30000
      }
    ]);
    return answers.interval;
  }
}
module.exports =CliHelper;

