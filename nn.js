const { default: axios } = require("axios");

async function forme(){
     const res = await axios.post(
          'https://arb-mainnet.g.alchemy.com/v2/QlXFO2edkPcV7HHJcx89G',{
               "jsonrpc": "2.0",
  "method": "eth_gasPrice",
  "params": [],
  "id": 1
          },{
               "Content-Type": "application/json"
          }
     )
     return res
}

console.log(forme())