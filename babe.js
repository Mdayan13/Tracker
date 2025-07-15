#!/usr/bin/env node


const {program } = require("commander")
const {version} = require("./package.json")
const {handleGasPrice} = require("./src/commands/gasPrice")


program
     .name('babe')
     .description('this is Global command the author used this word to call his love')
     .version(version)

program
     .command('gasPrice')
     .description('to track the gasPrice of diffrent networks')
     .action(handleGasPrice)

program.parse();