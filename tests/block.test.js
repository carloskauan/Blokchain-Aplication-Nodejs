const Block = require("../src/blockchain/block.js")
//const DIFFICULTY = require("../config.js");

describe("Block", ()=>{
  beforeEach(()=>{
    data = "index.html";
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it("Comparação da `data` do bloco com a data settada", ()=>{
  });

  it("Comparação de `lastHash` com o `hash` do ultimo bloco", ()=>{
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  it("Gerando hash compativel com a difficuldade", ()=>{
    expect(block.hash.substring(0, block.difficulty)).toEqual("0".repeat(block.difficulty));
  });

  it("Diminui a dificuldade para blocos mais rapidos",()=>{
    console.log(block);
    expect(Block.adjustDifficulty(block, block.timeStemp + 360000)).toEqual(block.difficulty-1);
  });

  it("Aumentar a dificuldade para blocos mais lentos", ()=>{
    console.log(block);
    expect(Block.adjustDifficulty(block, block.timeStemp + 1)).toEqual(block.difficulty-1);
  });

});