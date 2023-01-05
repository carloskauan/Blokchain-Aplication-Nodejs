const SHA256 = require("crypto-js/sha256");

class Block{
  //estrutura do bloco
  constructor(timestemp, lastHash, hash, data){
    this.timestemp = timestemp; //Tempo em milisegundos
    this.lastHash = lastHash; // Hash do bloco anetrior
    this.hash = hash; //Hash do bloco atual
    this.data = data ; // Informação
  }

  toString(){ //Função para imprimir as onformações do bloco
    return `Block:
timestemp = ${this.timestemp}
lastHash = ${this.lastHash.substring(0, 10)}
hash = ${this.hash.substring(0, 10)}
data = ${this.data}
`;
  }

  static genesis(){ //Sett de valores iniciais padrões do bloco genesis
    return new this("Genesis time", "-------", "asdnasdnlkjw231234", []) //Retorando a instancia do bloco genesis
  }

  static mineBlock(lastBlock, data){ // Função que vai gerar novos blocos usando os..
    //dados do bloco anterior e a informção a ser transportada
    const timestemp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = Block.hash(timestemp, lastHash, data);

    return new this(timestemp, lastHash, hash, data) // Retornando a instancia do novo bloco
  }

  // SHA - 256 hash
  static hash(timestemp, lastHash, data){
    return SHA256(`${timestemp}${lastHash}${data}`).toString();
  }

  static blockHash(block){
    const {timestemp, lastHash, data} = block;
    return Block.hash(timestemp, lastHash, data);
  }
}

module.exports = Block;