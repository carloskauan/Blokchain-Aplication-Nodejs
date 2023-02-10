const Block = require("../src/blockchain/block.js")
const DIFFICULTY = require("../config.js");

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
    expect(block.hash.substring(0, DIFFICULTY)).toEqual("0".repeat(DIFFICULTY));
  });
});