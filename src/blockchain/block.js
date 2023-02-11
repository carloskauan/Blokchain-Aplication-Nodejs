const SHA256 = require("crypto-js/sha256");
const {DIFFICULTY, MINE_RATE} = require("../../config.js");

class Block{
  //estrutura do bloco
  constructor(timestemp, lastHash, hash, data, nonce, difficulty, ){
    this.timestemp = timestemp; //Tempo em milisegundos
    this.lastHash = lastHash; // Hash do bloco anetrior
    this.hash = hash; //Hash do bloco atual
    this.data = data ; // Informação
    this.nonce = nonce;
    this.difficulty =  difficulty || DIFFICULTY;

  }

  toString(){ //Função para imprimir as onformações do bloco
    return `Block:
timestemp = ${this.timestemp}
lastHash = ${this.lastHash.substring(0, 10)}
hash = ${this.hash.substring(0, 10)}
Nonce = ${this.nonce}
Difficulty = ${this.difficulty}
data = ${this.data}
`;
  }

  static genesis(){ //Sett de valores iniciais padrões do bloco genesis
    return new this(0, "000000", "1m3mds8f23j42in54032134gfa12etg455t", [],0, DIFFICULTY) //Retorando a instancia do bloco genesis
  }

  static mineBlock(lastBlock, data){ // Função que vai gerar novos blocos usando os..
    //dados do bloco anterior e a informção a ser transportada
    let hash, timestemp;
    const lastHash = lastBlock.hash;
    let {difficulty} = lastBlock;
    let nonce = 0;
    do{
      nonce++;
      timestemp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestemp);
      hash = Block.hash(timestemp, lastHash, data, nonce, difficulty);
    }while(hash.substring(0, difficulty)!=="0".repeat(difficulty));

    return new this(timestemp, lastHash, hash, data, nonce, difficulty) // Retornando a instancia do novo bloco
  }

  // SHA - 256 hash
  static hash(timestemp, lastHash, data, nonce, difficulty){
    return SHA256(`${timestemp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }

  static blockHash(block){
    const {timestemp, lastHash, data, nonce, difficulty} = block;
    return Block.hash(timestemp, lastHash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime){
    let {difficulty} =  lastBlock;
    difficulty = lastBlock.timestemp + MINE_RATE >= currentTime ? difficulty + 1 : difficulty - 1;
    return difficulty;
  };
}

module.exports = Block;