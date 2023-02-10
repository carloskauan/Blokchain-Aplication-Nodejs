const SHA256 = require("crypto-js/sha256");
const {DIFFICULTY} = require("../../config.js");

class Block{
  //estrutura do bloco
  constructor(timestemp, lastHash, hash, data, nonce){
    this.timestemp = timestemp; //Tempo em milisegundos
    this.lastHash = lastHash; // Hash do bloco anetrior
    this.hash = hash; //Hash do bloco atual
    this.data = data ; // Informação
    this.nonce = nonce;
  }

  toString(){ //Função para imprimir as onformações do bloco
    return `Block:
timestemp = ${this.timestemp}
lastHash = ${this.lastHash.substring(0, 10)}
hash = ${this.hash.substring(0, 10)}
Nonce = ${this.nonce}
data = ${this.data}
`;
  }

  static genesis(){ //Sett de valores iniciais padrões do bloco genesis
    return new this("Genesis time", "000000", "1m3mds8f23j42in54032134gfa12etg455t", [], 0) //Retorando a instancia do bloco genesis
  }

  static mineBlock(lastBlock, data){ // Função que vai gerar novos blocos usando os..
    //dados do bloco anterior e a informção a ser transportada
    let hash, timestemp;
    const lastHash = lastBlock.hash;
    let nonce = 0;
    do{
      nonce++;
      timestemp = Date.now();
      hash = Block.hash(timestemp, lastHash, data, nonce);

    }while(hash.substring(0, DIFFICULTY)!=="0".repeat(DIFFICULTY));

    return new this(timestemp, lastHash, hash, data, nonce) // Retornando a instancia do novo bloco
  }

  // SHA - 256 hash
  static hash(timestemp, lastHash, data, nonce){
    return SHA256(`${timestemp}${lastHash}${data}${nonce}`).toString();
  }

  static blockHash(block){
    const {timestemp, lastHash, data, nonce} = block;
    return Block.hash(timestemp, lastHash, data, nonce);
  }
}

module.exports = Block;