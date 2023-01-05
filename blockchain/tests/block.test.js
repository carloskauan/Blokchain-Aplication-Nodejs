const Block = require("../src/block.js")

describe("Block", ()=>{
  beforeEach(()=>{
    data = "index.html";
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it("Comparação da `data` do bloco com a data settada", ()=>{
    expect(block.data).toEqual(data);
  });

  it("Comparação de `lastHash` com o `hash` do ultimo bloco", ()=>{
    expect(block.lastHash).toEqual(lastBlock.hash);
  });
});