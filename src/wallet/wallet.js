const ChainUntil =  require("../chain-until/chain-until.js")
const {INITIAL_BALANCE} = require("../../config.js");

class Wallet{
  constructor(){
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUntil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  toString(){
    return `Wallet - 
Public Key: ${this.publicKey.toString()}
Balance: ${this.balance}`
  }
}

module.exports = Wallet;